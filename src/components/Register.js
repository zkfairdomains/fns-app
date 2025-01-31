import { ethers, formatEther, keccak256, parseEther } from "ethers";
import { apolloClient, wagmiConfig } from "../config";
import { readContract, writeContract } from '@wagmi/core'
import { toast } from "react-toastify";
import React, {Component} from 'react';
import zkfRegisterControllerABI from '../abi/ZKFRegisterController.json'
import { waitForTransactionReceipt } from '@wagmi/core'
import spinner from '../assets/images/spinner.svg';
import moment from "moment";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";  
import { GET_DOMAIN } from "../graphql/Domain";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { getDateSimple, getExpires, getLabelHash, getNameHash, getOneYearDuration, getTimeAgo, getTokenId, obscureLabel, obscureName } from "../helpers/String";
import { getBalance } from '@wagmi/core'
import { goerli, sepolia, zkFair } from 'wagmi/chains'

class Register extends Component {
     
    resolver = process.env.REACT_APP_PUBLICRESOLVER;
    data =  [];
    reverseRecord = true;

    minWait = process.env.REACT_APP_MINCOMMITMENTAGE; 
    maxWait = process.env.REACT_APP_MAXCOMMITMENTAGE;

    constructor(props) {
      super(props);

      this.state = {
         commitment: null,
         isCommitRequesting: false,
         isCommiting: false,
         isCommitted: false,
         secret: null,
         isRegistring: false,
         available: null,
         isAvailablePending: false,
         isPendingPrevCommitment: false,
         isCommitmentExists: false,
         isRegistered: false,
         isMakingCommitment: false,
         domain: null,
         isTimerCompleted: false,
         duration: 1,
         isFetchingPrice: false,
         isFetchedPrice: true,
         price: 0,
         isGettingBalance: false,
         balance: 0,
         showCounter: false,
         countdown: 0
      };
    }

    async makeCommitment() {
        console.log("make function")
 
        const random =  Math.floor(Math.random() * 1000);
        const secret = keccak256(ethers.toUtf8Bytes(random))
           
        let _commitment = null; 

        this.setState({ isMakingCommitment: true, isCommitted: false, commitment: null, secret: null, isCommiting: false });

        console.log(this.props.duration);

        try {
            
            _commitment =  await readContract(wagmiConfig, {
                abi: zkfRegisterControllerABI,
                address: process.env.REACT_APP_ZKFREGISTERCONTROLLER,
                functionName: "makeCommitment",
                args: [ this.props.name, this.props.owner, this.getDuration(), secret, this.resolver, this.data, this.reverseRecord ],
                account: this.props.owner,
                chainId: process.env.REACT_APP_NODE_ENV === "production" ? zkFair.id: sepolia.id
            });

            console.log("make: "+ _commitment)
            

        } catch(e) {
            toast.error(e.message);
        }

        try {
  
            const result =  await readContract(wagmiConfig, {
                abi: zkfRegisterControllerABI,
                address: process.env.REACT_APP_ZKFREGISTERCONTROLLER,
                functionName: "commitments",
                args: [ _commitment ],
                account: this.props.owner,
                chainId: process.env.REACT_APP_NODE_ENV === "production" ? zkFair.id: sepolia.id
            });
 
            console.log("Result: "+ result  );
            console.log("Min: "+ this.getMinCommitTime(result)  );
            console.log("Max: "+ this.getMaxCommitTime(result)  );
            console.log("NOW:"+ this.getUnixTime())
            console.log("Diff:"+   parseInt(this.getMinCommitTime(result)- this.getUnixTime()) )

            if( result > 0 && this.getMinCommitTime(result) < this.getUnixTime() && this.getMaxCommitTime(result) > this.getUnixTime() ) {
                console.log("timer completed")
                this.setState({ commitment: _commitment, secret: secret, isCommitmentExists: true, isTimerCompleted: true });
            } else if( result > 0 && this.getMinCommitTime(result) >= this.getUnixTime() && this.getMaxCommitTime(result) > this.getUnixTime() ) {
                console.log("timer uncompleted")
                const _countdown = parseInt(this.getMinCommitTime(result) - this.getUnixTime() );
                this.setState({ commitment: _commitment, secret: secret, isCommitmentExists: true, isTimerCompleted: false, countdown: _countdown + 1 });
            } else {
                this.setState({ commitment: _commitment, secret: secret, isCommitmentExists: false, isTimerCompleted: false  })
            } 

        } catch (e) {

            toast.error(e.message);

        }
    }

    getMinCommitTime (c) {
        return moment.unix(parseInt(c)).add(this.minWait, "seconds").unix();
    }

    getMaxCommitTime (c) {
        return moment.unix(parseInt(c)).add(this.maxWait, "seconds").unix();
    }

    getUnixTime () {
        return moment().utc().unix();
    }
 
    async handleCommit () {
         
        this.setState({ isCommiting: true, isCommitted: false  });
 
        try {
            const _hash = await writeContract(wagmiConfig, {
                abi: zkfRegisterControllerABI,
                address: process.env.REACT_APP_ZKFREGISTERCONTROLLER,
                functionName: "commit",
                args: [ this.state.commitment ],
                account: this.props.owner,
                chainId: process.env.REACT_APP_NODE_ENV === "production" ? zkFair.id: sepolia.id
            });

          
            toast.success("Your transaction has been sent.");

            console.log(_hash);
 
            const recepient = await waitForTransactionReceipt(wagmiConfig, { hash: _hash });

            console.log(recepient);

            toast.success("Your tx has been completed. Please wait for a while...")
 
            this.setState({ isCommiting: false, isCommitted: true });
        } catch(e) {
            console.log(e);
            this.setState({ isCommiting: false });
            toast.error(e.message);
        }
         
        
        this.setState({ isCommiting: false });
        
    }

    async handleRegister () { 
         
        try {

            this.setState({ isRegistring: true, isRegistered: false });

            // 551880000000000000n
            console.log(parseEther(this.state.price.toString()))
            console.log(this.state.price.toString())

            const _hash = await writeContract(wagmiConfig, {
                abi: zkfRegisterControllerABI,
                address: process.env.REACT_APP_ZKFREGISTERCONTROLLER,
                functionName: "register",
                args: [ this.props.name, this.props.owner, this.getDuration(), this.state.secret, this.resolver, this.data, this.reverseRecord ],
                account: this.props.owner,
                value: this.state.price,
                chainId: process.env.REACT_APP_NODE_ENV === "production" ? zkFair.id: sepolia.id
            });

            toast.success("Your transaction has been sent.");

            const recepient = await waitForTransactionReceipt(wagmiConfig, {  hash: _hash });

            console.log(recepient);

            toast.success("Your transaction has been completed.");

            this.setState({ isRegistring: false, isRegistered: true, available: false });

        } catch(e) {
            toast.error(e.message);
            this.setState({ isRegistring: false, isRegistered: false });
        } 
    }

    async handleAvailable() {
        console.log("available")

        let _available = false; 

        try {

            this.setState({ isAvailablePending: true });

            _available = await readContract(wagmiConfig, {
                abi: zkfRegisterControllerABI,
                address: process.env.REACT_APP_ZKFREGISTERCONTROLLER,
                functionName: 'available',
                args: [this.props.name],
                account: this.props.owner,
                chainId: process.env.REACT_APP_NODE_ENV === "production" ? zkFair.id: sepolia.id
            });

            this.setState({ isAvailablePending: false });
            this.setState({ available: _available });

        } catch (e) {

            this.setState({ isAvailablePending: false });
            toast.error(e.message);

        }
    } 

    async handleQuery() {

        try {
            let name = this.props.name + ".zkf";
            const result = await apolloClient.query( {
                query: GET_DOMAIN,
                variables: {
                    name
                }
            }); 
            this.setState({ domain: result.data.domains[0] })
        } catch(e) {
            console.log(e);
        }

    }
 
    handleDurationDown(e) {
        if(this.state.duration > 1 && !this.state.isCommitted) {
            this.setState({ duration: this.state.duration - 1 });
        }
    }

    handleDurationUp(e) {
        if(!this.state.isCommitted) {
            this.setState({ duration: this.state.duration + 1 });
        }       
    }

    getDuration() {
        return this.state.duration * getOneYearDuration();
    }
 
    async handlePrice() {
        console.log("handlePrice")
        let _price = false; 
 
        try {
            this.setState({ isFetchingPrice: true });
            _price = await readContract(wagmiConfig, {
                abi: zkfRegisterControllerABI,
                address: process.env.REACT_APP_ZKFREGISTERCONTROLLER,
                functionName: 'rentPrice',
                args: [this.props.name, this.getDuration()],
                account: this.props.owner,
                chainId: process.env.REACT_APP_NODE_ENV === "production" ? zkFair.id: sepolia.id
            });
            
            console.log(_price)
            this.setState({ isFetchingPrice: false, price: _price.base });
        } catch(e) {
            this.setState({ isFetchedPrice: false });
            toast.error(e.message);
        }
    }

    async handleBalance() {
        console.log("handleBalance")
        try {

            this.setState({ isGettingBalance : true });

            const balance = await getBalance(wagmiConfig, {
                address: this.props.owner, 
            });

            this.setState({ isGettingBalance : false, balance: balance.value });
            console.log("balance:"+ balance.value)
        } catch(e) {
            this.setState({ isGettingBalance : false });
            toast.error(e.message);
        }
    }

    componentDidMount () {   
        
        console.log("commitments:"+ this.state.commitments);
        
        if(this.state.available === null) { 
            this.handleAvailable();
            this.handleQuery(); 
        }
 
        if(this.state.commitment === null && !this.state.isMakingCommitment) {
            this.makeCommitment(); 
        }

        if(!this.state.available) {
            this.handleQuery(); 
        }

        if(this.state.duration) { 
            this.handlePrice();
            this.handleBalance();
        }
    }

    componentDidUpdate(prevProps, prevState) { 
        
        if(prevProps.name != this.props.name) {
            this.handleAvailable();
            this.makeCommitment();
            this.handleQuery();
            this.handlePrice();
            this.handleBalance();
        } 

        if(prevState.duration != this.state.duration) {
            this.makeCommitment();
            this.handlePrice();
            this.handleBalance();
        } 
    }
 
    render() {  
        
        return (
            <> 
              
            {this.state.available ? 
                <div className="container">
                    <div className="d-flex flex-column justify-content-center countdowncontent">
                        <ul>
                            <li>
                                <div className="customCounter">
                                    <button onClick={(e)=> this.handleDurationDown(e)} className="countminus"></button>
                                    <div><small>{this.state.duration} year </small></div>
                                    <button onClick={(e)=> this.handleDurationUp(e)} className="countplus"></button>
                                </div>
                            </li>
                            <li className="text-center fw-bold fs-5">
                                <span>Total: <span className="fw-bold">{formatEther(  this.state.price.toString()) } {process.env.REACT_APP_NATIVE_TOKEN} </span> + GAS Fee</span>
                            </li>
                        </ul> 
                        {this.state.commitment == null || this.isFetchingPrice || this.state.isGettingBalance ? 
                            <button className="btn btn-danger  align-self-center">
                                <img width={25} src={spinner} /> Checking...
                            </button>
                            : 
                            <>
                                { this.state.balance < this.state.price ?
                                    <button disabled="disabled" className="btn btn-light">
                                        Unsufficient Balance {this.state.balance}
                                    </button>
                                    :
                                    <>
                                        { !this.state.isCommitted && !this.state.isCommitmentExists ?  
                                            <> 
                                                <button disabled={this.state.isCommiting ? "disabled": ""} className="btn btn-danger f-20 mt-3 mb-3" onClick={(e)=> this.handleCommit() }>
                                                    {this.state.isCommiting ? <><img width={25} src={spinner} /> Waiting Transaction</>: <>Request to Register</>} 
                                                </button>  
                                            </> : 
                                            <>
                                                { this.state.isCommitted || (this.state.isCommitmentExists && !this.state.isTimerCompleted) ?
                                                    <CountdownCircleTimer 
                                                            size={48}
                                                            strokeWidth={3}
                                                            isPlaying
                                                            duration={ this.state.countdown < 1 ? Number(process.env.REACT_APP_MINCOMMITMENTAGE): this.state.countdown } 
                                                            colors={['#239e01', '#2ece02', '#e5ed07', '#e13022']}
                                                            colorsTime={[7, 5, 2, 0]}
                                                            onComplete={()=> this.setState({ isTimerCompleted: true })}
                                                            >
                                                            {({ remainingTime }) => remainingTime}
                                                    </CountdownCircleTimer>
                                                    : <></>
                                                }
                                                
                                                <button disabled={this.state.isRegistring || !this.state.isTimerCompleted ? "disabled": ""} className="btn btn-danger align-self-center" onClick={(e)=> this.handleRegister() }>
                                                    {this.state.isRegistring ? <><img width={25} src={spinner} />Waiting Transaction</>: <>REGISTER</>} 
                                                </button>
                                            </>
                                        }
                                    </>
                                }
                                
                            </>
                        }
                        <span className="mt-2 text-center">Requesting register helps prevent others from registering the name before you do. Your name is not registered until you've completed the second transaction.</span>
                    </div>
                </div>
                : 
                <> </>
            }

            {this.state.isRegistered ? 
                <>
                    <Modal 
                        size="lg" 
                        show={this.state.isRegistered}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered>
                            <Modal.Header>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    <h2>You claimed <b>{obscureName(this.props.name, 50)}.zkf</b> 😎</h2>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="fs-4">
                                <h3>What's next?</h3> 
                                <p>
                                    See your domains on My Domains page.
                                </p>
                                <p>
                                <Link className="btn btn-success btn-lg" to={"/account"}>Go to My Domains</Link>
                                </p>
                                <p>
                                    <small>Please note that It may take time for your domain to appear in "My Domains" page. This doesn't mean you could not minted. Data indexer service may delay a bit time</small>
                                </p>
                            </Modal.Body>
                            <Modal.Footer>
                                <button onClick={()=> this.setState({ isRegistered: false })} className="btn btn-default">Close</button>
                            </Modal.Footer>
                        </Modal> 
                </>
                : 
                <></>
            }
            </>
        )  
      
    }
        
}

export default Register;