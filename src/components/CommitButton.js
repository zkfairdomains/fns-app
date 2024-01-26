import { ethers, keccak256, parseEther } from "ethers";
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
import { useWeb3Modal } from "@web3modal/wagmi/react";
import {  } from "@apollo/client";
import { GET_DOMAIN } from "../graphql/Domain";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import CustomCounter from "../partials/Customcounter";

class CommitButton extends Component {
    
  


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
         isTimerCompleted: false
      };
    }
    async makeCommitment() {
        console.log("make function")
 
        const random =  Math.floor(Math.random() * 1000);
        const secret = keccak256(ethers.toUtf8Bytes(random))
           
        let _commitment = null; 

        this.setState({ isMakingCommitment: true, isCommitted: false, commitment: null, secret: null, isCommiting: false });

        try {
            
            _commitment =  await readContract(wagmiConfig, {
                abi: zkfRegisterControllerABI,
                address: process.env.REACT_APP_ZKFREGISTERCONTROLLER,
                functionName: "makeCommitment",
                args: [ this.props.name, this.props.owner, this.props.duration, secret, this.resolver, this.data, this.reverseRecord ],
                account: this.props.owner
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
                account: this.props.owner
            });

            console.log("result: "+ result);

            if(result > 0 &&  Number(result) + this.maxWait >= moment().utc().unix() ) {
                this.setState({ commitment: _commitment, secret: secret, isCommitmentExists: true })
            } else this.setState({ commitment: _commitment, secret: secret, isCommitmentExists: false })

        } catch (e) {

            toast.error(e.message);

        }
    }
 
    async handleCommit () {
         
        this.setState({ isCommiting: true })
        this.setState({ isCommitted: false })
 
        try {
            const _hash = await writeContract(wagmiConfig, {
                abi: zkfRegisterControllerABI,
                address: process.env.REACT_APP_ZKFREGISTERCONTROLLER,
                functionName: "commit",
                args: [ this.state.commitment ],
                account: this.props.owner,
                onError: (e)=> { 
                    toast.error(e.message);
                }
            });

            toast.success("Your transaction has been sent.");

            console.log(_hash);
 
            const recepient = await waitForTransactionReceipt(wagmiConfig, {  hash: _hash });

            console.log(recepient);

            toast.success("Your tx has been completed. Please wait for a while...")
 
            this.setState({ isCommitted: true });
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

            const _hash = await writeContract(wagmiConfig, {
                abi: zkfRegisterControllerABI,
                address: process.env.REACT_APP_ZKFREGISTERCONTROLLER,
                functionName: "register",
                args: [ this.props.name, this.props.owner, this.props.duration, this.state.secret, this.resolver, this.data, this.reverseRecord ],
                account: this.props.owner,
                value: parseEther("0.25")
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
                account: this.props.owner
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
            let labelName = this.props.name;
            const result = await apolloClient.query( {
                query: GET_DOMAIN,
                variables: {
                    labelName
                }
            });

            console.log(result.data.domains[0] );

            this.setState({ domain: result.data.domains[0] })
        } catch(e) {
            console.log(e);
        }

    }
 
    componentDidMount () {     
        if(this.state.available === null) {
            this.handleAvailable();
        }
 
        if(this.state.commitment === null && !this.state.isMakingCommitment) {
            this.makeCommitment(); 
        }
    }

    componentDidUpdate(prevProps, prevState) { 
 
        if(prevProps.name != this.props.name) {
            this.handleAvailable();
            this.makeCommitment(); 
        }

        if(prevProps.available == false) {
            this.handleQuery();
        }
    }
 
    render() {  
        
        return (
            <> 
            {this.state.isAvailablePending ? 
                <> 
                    <div className="container mt-3">
                        <div className="alert alert-info text-center">
                            <h3> Searching...</h3>
                        </div>
                        
                    </div>
                </>
                : 
                <div className="container mt-3"> 
                    <div className={this.state.available ? "alert alert-success text-center": "alert alert-danger text-center" }>
                        <h3>  
                            <>
                                { this.state.available ? <> <b>{this.props.name}.zkf</b> is available to claim 🥳 </>: <><b>{this.props.name}.zkf</b> is not available to claim 🙁</>}
                            </> 
                        </h3>
                    </div>
                </div>
            }  

            {this.state.available ? 
                <div className="container">
                    <div className="white-content d-flex flex-column justify-content-center countdowncontent">
                    {this.state.commitment == null ? 
                        <>
                        <button className="btn btn-danger  align-self-center">
                            <img width={25} src={spinner} /> Checking...
                        </button>
                        </> : 
                        <>
                            { !this.state.isCommitted && !this.state.isCommitmentExists ? 
                                
                                <>
                                    <CustomCounter />
                                    <button disabled={this.state.isCommiting ? "disabled": ""} className="btn btn-danger" onClick={(e)=> this.handleCommit() }>
                                        {this.state.isCommiting ? <><img width={25} src={spinner} /> Waiting Transaction</>: <>Request to Register</>} 
                                    </button>
                                    
                                </> : 
                                <>
                                    <CountdownCircleTimer 
                                            size={48}
                                            strokeWidth={3}
                                            isPlaying
                                            duration={Number(process.env.REACT_APP_MINCOMMITMENTAGE)} 
                                            colors={['#239e01', '#2ece02', '#e5ed07', '#e13022']}
                                            colorsTime={[7, 5, 2, 0]}
                                            onComplete={()=> this.setState({ isTimerCompleted: true })}
                                            >
                                            {({ remainingTime }) => remainingTime}
                                    </CountdownCircleTimer> 

                                    <button disabled={this.state.isRegistring || !this.state.isTimerCompleted ? "disabled": ""} className="btn btn-success align-self-center" onClick={(e)=> this.handleRegister() }>
                                        {this.state.isRegistring ? <><img width={25} src={spinner} />Waiting Transaction</>: <>Register</>} 
                                    </button>
                                </>
                            }
                            <span className="mt-2 text-center">Requesting register helps prevent others from registering the name before you do. Your name is not registered until you've completed the second transaction.</span>
                        </>
                    }
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
                                    <h2>You claimed <b>{this.props.name}.zkf</b> 😎</h2>
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

export default CommitButton;