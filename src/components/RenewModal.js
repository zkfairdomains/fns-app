import { formatEther, parseEther } from "ethers";
import { wagmiConfig } from "../config";
import { readContract, writeContract } from '@wagmi/core'
import { toast } from "react-toastify";
import React, {Component} from 'react';
import zkfRegisterControllerABI from '../abi/ZKFRegisterController.json'
import { waitForTransactionReceipt } from '@wagmi/core'
import spinner from '../assets/images/spinner.svg';
import { Modal } from "react-bootstrap";
import {  } from "@apollo/client";
import { getExpires, getTimeAgo, obscureName } from "../helpers/String";
import { getBalance } from '@wagmi/core'
import { goerli, sepolia, zkFair } from 'wagmi/chains'

class RenewModal extends Component {

    constructor(props) {
  
        super(props);
  
        this.state = {
           domain: null,
           duration: 1,
           isFetchingPrice: false,
           isFetchedPrice: true,
           price: 0,
           isRenewing: false,
           isRenewed: false,
           showModal: undefined,
           balance: 0,
           isGettingBalance: false
        };
 
    }

    handleClose = () =>{
        this.setState({ showModal: undefined });
    } 

    handleShow = (id) =>{
        this.setState({ showModal: id });
    } 
 
    async handleRenew () { 
        console.log("handleRenew")
        try {

            this.setState({ isRenewing: true, isRenewed: false });
 
            console.log(parseEther(this.state.price.toString()))
            console.log(this.state.price.toString())

            const _hash = await writeContract(wagmiConfig, {
                abi: zkfRegisterControllerABI,
                address: process.env.REACT_APP_ZKFREGISTERCONTROLLER,
                functionName: "renew",
                args: [ this.props.domain.labelName, this.getDuration() ],
                account: this.props.owner,
                value: this.state.price,
                chainId: process.env.REACT_APP_NODE_ENV === "production" ? zkFair.id: sepolia.id
            });

            toast.success("Your transaction has been sent.");

            const recepient = await waitForTransactionReceipt(wagmiConfig, {  hash: _hash });

            console.log(recepient);

            toast.success("Your transaction has been completed.");

            this.setState({ isRenewing: false, isRenewed: true, showModal: undefined });
 
        } catch(e) {
            toast.error(e.message);
            this.setState({ isRenewing: false, isRenewed: false });
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
        return this.state.duration * 60 * 60 * 24 * 365;
    }

    async handlePrice() {
        console.log("handlePrice Renew")
        let _price = false; 

        try { 

            this.setState({ isFetchingPrice: true, isFetchedPrice: false });

            _price = await readContract(wagmiConfig, {
                abi: zkfRegisterControllerABI,
                address: process.env.REACT_APP_ZKFREGISTERCONTROLLER,
                functionName: 'rentPrice',
                args: [this.props.domain.labelName, this.getDuration()],
                account: this.props.owner,
                chainId: process.env.REACT_APP_NODE_ENV === "production" ? zkFair.id: sepolia.id
            });
            
            console.log(_price) 

            this.setState({ isFetchingPrice: false, isFetchedPrice: true, price: _price.base });

        } catch(e) { 
            this.setState({ isFetchingPrice: false, isFetchedPrice: false });
            toast.error(e.message);
        }
    }

    async handleBalance() {
        console.log("handleBalance")
        try {

            this.setState({ isGettingBalance : true });

            const balance = await getBalance(wagmiConfig, {
                address: this.props.owner, 
                chainId: process.env.REACT_APP_NODE_ENV === "production" ? zkFair.id: sepolia.id
            });

            this.setState({ isGettingBalance : false, balance: balance.value });
            console.log("balance:"+ balance.value)
        } catch(e) {
            this.setState({ isGettingBalance : false });
            toast.error(e.message);
        }
    }
 
    componentDidMount () {     
       
    }

    componentDidUpdate(prevProps, prevState) { 

        if(this.state.showModal != prevState.showModal) {
            this.handlePrice();
            this.handleBalance();
        }

        if(prevState.duration != this.state.duration ) {
            this.handlePrice();
            this.handleBalance();
        }
    }

    render() { 
        
        return (
            <>
            <button className="green f-19" onClick={() => this.handleShow(this.props.domain.id)}> 
                Renew
            </button>

            <Modal {...this.props} 
                show={this.state.showModal === this.props.domain.id} 
                onHide={() => this.handleClose()}  
                size="lg"
                backdrop="static"
                dialogClassName="modal-90w"
                centered
            >
                <Modal.Header>
                <Modal.Title>Renew Your Domain</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="tableContent">
                    <table className="w-100 tabletype2">
                        <thead>
                            <tr>
                                <th width="35%">Name</th>
                                <th width="35%">Expires</th>
                                <th width="35%">Extend</th> 
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{obscureName(this.props.domain.name, 50)}</td>
                            <td>{getExpires(this.props.domain.expiryDate)}</td>
                            <td>
                                <div className="customCounter">
                                    <button onClick={(e)=> this.handleDurationDown(e)} className="countminus"><em></em></button>
                                    <div><small>
                                    {this.state.duration} year
                                    </small></div>
                                    <button onClick={(e)=> this.handleDurationUp(e)} className="countplus"><em></em><em></em></button>
                                </div>
                                {this.state.isFetchedPrice ? formatEther(  this.state.price.toString()) : "..." } {process.env.REACT_APP_NATIVE_TOKEN} + GAS Fee
                            </td> 
                        </tr>
                        </tbody>
                    </table> 
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-default" onClick={() => this.handleClose() }>Cancel</button>
                    { this.isFetchingPrice || this.state.isGettingBalance ? 
                            <button className="btn btn-default  align-self-center">
                                <img width={25} src={spinner} /> Checking...
                            </button>
                            : 
                            <>
                                { this.state.balance < this.state.price ? 
                                    <button disabled="disabled" className="btn btn-danger">
                                        Unsufficient Balance {this.state.balance}
                                    </button>
                                    :
                                    <button className="btn btn-success" onClick={()=> this.handleRenew()}>
                                        {this.state.isRenewing ? <><img width={25} src={spinner} /> Waiting Transaction</>: <>Extend</>} 
                                    </button>
                                }
                            </>
                    }
                    
                </Modal.Footer>
            </Modal>
            </>
            
        )
    }
  
}

export default RenewModal;