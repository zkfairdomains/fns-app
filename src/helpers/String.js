import { ethers } from 'ethers'; 
import moment from 'moment';
import namehash from "@ensdomains/eth-ens-namehash";
import {validate} from "@ensdomains/ens-validation"           
import json5 from "json5";

const GRACE_PERIOD = Number(process.env.REACT_APP_GRACE_PREIOD);
const PREMIUM_PERIOD =  Number(process.env.REACT_APP_PREMIUM_PERIOD);
 
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export const obscureAddress = (address) => {
    return address.substring(0, 6) + '...' + address.substring(address.length - 4, address.length);
}
 
export const obscureEnsName = (name) => {
    const arr = name.split(".");
    const ext = arr[arr.length -1];
    arr.pop();
    const lbl = arr.join(".");
    
    if(lbl.length > 15) 
        return `${lbl.substring(0, 4)}...${lbl.substring(lbl.length - 4, lbl.length)}.${ext}`;

    return `${lbl}.${ext}`
}

export const obscureName = (name, len) => {
    if(getLength(name) > len) {
        return Array.from(name).slice(0, len / 2).join("") + "..." + Array.from(name).slice(name.length - (len / 2), name.length).join("");
    } else {
        return name;
    }
}

export const obscureLabel = (label, len) => {
    if(getLength(label) > len) {
        return Array.from(label).slice(0, len).join("") + "...";
    } else {
        return label;
    }
}

export const getTokenId = (label) => {
    const labelHash = ethers.keccak256(ethers.toUtf8Bytes(label));
    const tokenId = ethers.toBigInt(labelHash).toString();
    return tokenId;
}

export const getLabelHash = (label) => { 
    return ethers.keccak256(ethers.toUtf8Bytes(label));;
}

export const getNameHash = (name) => { 
    return namehash.hash(name);
}
  
export const isAscii = (label) => { 
    for (let i = 0; i < label.length; i++) {
        const c = label.charCodeAt(i)
        if( !(c >= 32 && c < 127) ) {
            return false;
        }
    }
    return true;
}

export const getLength = (label) => { 
    return Array.from(label).length;
}

export const getSegmentLength = (label) => { 
    return label.length;
} 

export function getTimeAgo(timestamp) {
    if(timestamp === null) return "-";
    return  moment.unix(timestamp).fromNow()
}

export function getExpires(expires, suffix = false) {
    if(expires === null) return "-";
    return moment.unix(expires).add(GRACE_PERIOD + PREMIUM_PERIOD, "days").fromNow(suffix)
}

export function getExpireCondition() {
    return moment().add(-GRACE_PERIOD, "days").add(-PREMIUM_PERIOD, "days").utc().unix()
}

export function isExpired(expires) { 
    return moment.unix(expires).utc().diff(moment().utc(), "seconds") <= -( (GRACE_PERIOD + PREMIUM_PERIOD) * 24 * 60 * 60)  ;
}

export function isExpiring(expires) {  
    return moment.unix(expires).utc().diff(moment().utc(), "seconds") <= 0 && moment.unix(expires).diff(moment(), "seconds") >= -(GRACE_PERIOD * 24 * 60 * 60);
}

export function isPremium(expires) { 
    return moment.unix(expires).utc().diff(moment(), "seconds") <= -(GRACE_PERIOD * 24 * 60 * 60) && moment.unix(expires).diff(moment(), "seconds") >= -((GRACE_PERIOD + PREMIUM_PERIOD) * 24 * 60 * 60)  ;
}

export function isAvailable(expires) {
    return expires === null || isExpired(expires) || isPremium(expires);
}

export function getDateString(timestamp) {
    if(timestamp === null) return "-";
    return moment.unix(timestamp).toDate().toDateString();
} 

export function getDateSimple(timestamp) {
    if(timestamp === null) return "-";
    return moment.unix(timestamp).format("L");
}

export function normalizeName (name) {
    return namehash.normalize(name);
}
  
export function isValidDomain(name) {
    try {
      return isValidName(name) === true && name.indexOf(".") === -1;
    } catch {
      return false;
    }
}

export function isValidName(name) {
    try {
      return validate(name) === true && name === namehash.normalize(name);
    } catch {
      return false;
    }
}

export function getDurationSeconds(n, period) {
    if(period === "day") {
        return Number(n) * 24 * 60 * 60;
    } else if(period === "week") {
        return Number(n) * 7 * 24 * 60 * 60;
    } else if(period === "month") {
        return Number(n) * 30 * 24 * 60 * 60;
    } else if(period === "year") {
        return Number(n) * 12 * 30 * 24 * 60 * 60;
    } else {
        return 1 * 12 * 30 * 24 * 60 * 60;
    }
}
   
export function jsonParse(filter) {
    return json5.parse(filter, {quote: '"'});;
}

export function jsonStringify(filter) {
    return json5.stringify(filter, { quote: '"'})
}
  
export function toBN(value) {
    return ethers.toBigInt(value);
}

export function toGwei(gasPrice) {
    return ethers.formatUnits(gasPrice, "gwei");
}  

export function toWei(value, decimals = 18) {
    return ethers.parseUnits(value, decimals);
} 

export function fromWei(value, decimals = 18) {
    return ethers.formatUnits(value, decimals);
}

export function isZero(hexNumberString) {
    return /^0x0*$/.test(hexNumberString);
}

export function getOneYearDuration() {
    return 1 * 60 * 60 * 24 * 365;
}
 
 