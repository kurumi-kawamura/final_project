import { createGlobalStyle } from "styled-components";


export default createGlobalStyle`
:root {
    --soft-black: #363636;
    --soft-gray: #8B8585;
    
}
*{
    margin: 0;
    padding:0;
    font-family: "Lexend", sans-serif;
    
    font-weight: 400;
}

body{
    color: var(--soft-black);
}


`;
