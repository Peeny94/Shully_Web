import PropTypes from "prop-types"; 
import React from "react";
import { db } from "../firebase";
import { ShullyWrapper, ShullyColumn, ShullyPayload, ShullyUsername, Photo,  } from "./auth-Components";
export default function Shully({username, photo, shully}){
    return(
        <ShullyWrapper>
            <ShullyColumn>
                <ShullyUsername>{username}</ShullyUsername>
                <ShullyPayload>{shully}</ShullyPayload>
            </ShullyColumn>
            {photo? (<ShullyColumn>
                <Photo src = {photo}/>
            </ShullyColumn>) : null}

        </ShullyWrapper>
    );
}

