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

class Domain extends Component {
      
    constructor(props) {
      super(props);

      this.state = {
         available: null,
         isAvailablePending: false,
         domain: null
      };
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
  
    componentDidMount () {   
        
        console.log("commitments:"+ this.state.commitments);
        
        if(this.state.available === null) { 
            this.handleAvailable();
            this.handleQuery(); 
        }
  
        if(!this.state.available) {
            this.handleQuery(); 
        } 
    }

    componentDidUpdate(prevProps, prevState) { 
        
        if(prevProps.name != this.props.name) {
            this.handleAvailable();
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
                                { this.state.available ? <> <b>{obscureLabel(this.props.name, 30)}.zkf</b> is available to claim 🥳 </>: <><b>{obscureLabel(this.props.name, 30)}.zkf</b> is not available to claim 🙁</>}
                            </> 
                        </h3>
                    </div>
                </div>
            }

            {this.state.domain ? 
                <div className="container tableContent">
                    <table>
                        <tbody>
                            <tr>
                                <td>Label</td>
                                <td>{this.state.domain.labelName}</td>
                            </tr>
                            <tr>
                                <td>Token ID</td>
                                <td>{getTokenId( this.state.domain.labelName )}</td>
                            </tr>
                            <tr>
                                <td>Name Hash</td>
                                <td>{getNameHash( this.state.domain.labelName  ) }</td>
                            </tr>
                            <tr>
                                <td>Label Hash</td>
                                <td>{getLabelHash( this.state.domain.labelName )}</td>
                            </tr>
                            <tr>
                                <td>Owner</td>
                                <td>{this.state.domain?.owner?.id} {this.state.domain?.owner?.id?.toString() === this.props.owner?.id?.toString() ? <>(You)</>: <></>}</td>
                            </tr>
                            <tr>
                                <td>Registrant</td>
                                <td>{this.state.domain?.registrant?.id} {this.state.domain?.registrant?.id?.toString() === this.props.owner?.id?.toString() ? <>(You)</>: <></>}</td>
                            </tr>
                            <tr>
                                <td>Expires</td>
                                <td>{getExpires(this.state.domain.expiryDate)} - { getDateSimple(this.state.domain.expiryDate) }</td>
                            </tr>
                            <tr>
                                <td>Created</td>
                                <td>{getTimeAgo(this.state.domain.createdAt)} - { getDateSimple(this.state.domain.createdAt) } </td>
                            </tr>
                            <tr>
                                <td>Registered</td>
                                <td>{getTimeAgo(this.state.domain.registeredAt)} - { getDateSimple(this.state.domain.registeredAt) } </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                : <> </>
            } 
        </>
        )  
      
    }
        
}

export default Domain;