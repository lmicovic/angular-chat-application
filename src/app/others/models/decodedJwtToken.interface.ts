import { Injectable } from '@angular/core';
export interface DecodedJwtToken {
    
    // exp: JWT Token Expiration Date
    // iat: JWT Token Issued Date
    // iss: Name who Issued JWT Token
    // sub: Name to who is Issued JWT Token

    expr: number,
    iat: number,
    iss: string,
    sub: string

}