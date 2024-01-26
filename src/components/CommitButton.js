import { ethers, keccak256, parseEther } from "ethers";
import { wagmiConfig } from "../config";
import { readContract, writeContract } from '@wagmi/core'
import { toast } from "react-toastify";
import React, {Component} from 'react';
import zkfRegisterControllerABI from '../abi/ZKFRegisterController.json'
import { waitForTransactionReceipt } from '@wagmi/core'
import spinner from '../assets/images/spinner.svg';

class CommitButton extends Component {
 
    resolver = process.env.REACT_APP_PUBLICRESOLVER;
    data =  [];
    reverseRecord = true;

    minWait = process.env.REACT_APP_MINCOMMITMENTAGE; // inseconds
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
         isPrevCommitmentLoading: false
      };
    }

    async makeCommitment() {
        console.log("make")
 
        const random =  Math.floor(Math.random() * 1000);
        const secret = keccak256(ethers.toUtf8Bytes(random))
           
        let commitment = null;

        this.setState({ isCommitted: false, commitment: null, secret: null, isCommiting: false })
        try {
             commitment =  await readContract(wagmiConfig, {
                abi: zkfRegisterControllerABI,
                address: process.env.REACT_APP_ZKFREGISTERCONTROLLER,
                functionName: "makeCommitment",
                args: [ this.props.name, this.props.owner, this.props.duration, secret, this.resolver, this.data, this.reverseRecord ],
                account: this.props.owner
            });

            this.setState({ commitment: commitment });
            this.setState({ secret: secret });

        } catch(e) {
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

            toast.success("Your commit tx has been sent. Please wait your transaction to complete.");

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
        
        const resolver = process.env.REACT_APP_PUBLICRESOLVER;
        const data =  [];
        const reverseRecord = true;
 
        try {

            this.setState({ isRegistring: true });

            const _hash = await writeContract(wagmiConfig, {
                abi: zkfRegisterControllerABI,
                address: process.env.REACT_APP_ZKFREGISTERCONTROLLER,
                functionName: "register",
                args: [ this.props.name, this.props.owner, this.props.duration, this.state.secret, resolver, data, reverseRecord ],
                account: this.props.owner,
                value: parseEther("0.25")
            });

            toast.success("Your commit tx has been sent. Please wait your transaction to complete.");

            const recepient = await waitForTransactionReceipt(wagmiConfig, {  hash: _hash });

            console.log(recepient);

            toast.success("Your tx has been completed.");

            this.setState({ isRegistring: false });

        } catch(e) {
            console.log(e);
            toast.error(e.message);
            this.setState({ isRegistring: false });
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

            console.log(_available);

            this.setState({ isAvailablePending: false });
            this.setState({ available: _available });

        } catch (e) {

            this.setState({ isAvailablePending: false });
            toast.error(e.message);

        }
    }

    async handlePrevCommit() {
        console.log("handlePrevCommit")

        let _commitment = false; 

        try {

            this.setState({ isPendingPrevCommitment: true });

            _commitment = await readContract(wagmiConfig, {
                abi: zkfRegisterControllerABI,
                address: process.env.REACT_APP_ZKFREGISTERCONTROLLER,
                functionName: 'commitments',
                args: [ ],
                account: this.props.owner
            });

            console.log(_commitment);

            this.setState({ isPendingPrevCommitment: false });
            this.setState({ commitment: _commitment });

        } catch (e) {

            this.setState({ isPendingPrevCommitment: false });
            toast.error(e.message);

        }
    }

    componentDidMount () {   
        console.log("componentDidMount")

        if(this.state.available === null) {
            this.handleAvailable();
        }

        if(this.state.commitment === null) {
            this.makeCommitment();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate")
        if(prevProps.name != this.props.name) {
            this.handleAvailable();
            this.makeCommitment();
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.name != nextProps.name) {
            
        }
    }
 
    render() {  
        console.log(this.minWait)
        return (
            <> 
                {this.state.isAvailablePending ? 
                    <> 
                        <div className="alert alert-info text-center container mt-3">
                            <h3> Searching...</h3>
                        </div>
                    </>
                    : 
                    <> 
                        <div className={this.state.available ? "alert alert-success text-center container mt-3": "alert alert-danger text-center container mt-3" }>
                            <h3>  
                                <>
                                    { this.state.available ? <> <b>{this.props.name}.zkf</b> is available to claim 🥳 </>: <><b>{this.props.name}.zkf</b> is not available to claim 🙁</>}
                                </> 
                            </h3>
                        </div>
                    </>
                } 
            
             

            {this.state.commitment == null ? 
                <>
                <button className="btn btn-danger">
                     <img width={25} src={spinner} /> Checking...
                </button>
                </> : 
                <>
                    { !this.state.isCommitted ? 
                        <>
                            
                            <button disabled={this.state.isCommiting ? "disabled": ""} className="btn btn-danger" onClick={(e)=> this.handleCommit() }>
                                {this.state.isCommiting ? <><img width={25} src={spinner} /> Waiting Transaction</>: <>Request to Register</>} 
                            </button>
                            
                        </> : 
                        <>
                            
                            <button disabled={this.state.isRegistring ? "disabled": ""} className="btn btn-danger" onClick={(e)=> this.handleRegister() }>
                                {this.state.isRegistring ? <><img width={25} src={spinner} />Waiting Transaction</>: <>Register</>} 
                            </button>
                        </>
                    }
                    <span className="text-white mt-2">Requesting register helps prevent others from registering the name before you do. Your name is not registered until you've completed the second transaction.</span>
                </>
            }

            
            </>
        )  
      
    }
        
}

export default CommitButton;