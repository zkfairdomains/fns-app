
 
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export const obscureAddress = (address) => {
    return address.substring(0, 6) + '...' + address.substring(address.length - 4, address.length);
}
 