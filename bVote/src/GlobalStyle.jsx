import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
*{
    margin:0;
    padding:0;
    box-sizing: border-box;
    font-family: 'Work Sans', sans-serif;
}

html{
    font-size: 62.5%; /* 1rem = 10px*/
    overflow-x:hidden;
}
::-webkit-scrollbar{
  width:0.8rem;
}
::-webkit-scrollbar-track{
  background:transparent;
}
::-webkit-scrollbar-thumb{
  
  background-color:rgba(107, 07, 167, 0.223);
  border:1px solid transparent;
  border-radius:10px;
  background-clip:content-box;
}

h1{
    color:${({theme})=> theme.colors.heading};
    font-size:5rem;
    font-weight:600;
}

h2{
    color:${({theme})=> theme.colors.heading};
    font-size:4.4rem;
    font-weight:300;
    white-space:normal;
    text-align:center;
}

h3{
  
    font-size:1.6rem;
    font-weight:400;
}

p{
    color:${({theme})=> theme.colors.heading};
    // opacity:.7;
    margin-top:1rem;
    line-height:1.5;
    font-size:1.45rem;
    font-weight:400;
 
    
}


a{
text-decoration:none;
}
li{
    list-style:none;
}


.container {
    max-width: 120rem;
    margin: 0 auto;
  }
  .grid {
    display: grid;
    gap: 9rem;
  }
  .grid-two-column {
    grid-template-columns: repeat(2, 1fr);
  }
  .grid-three-column {
    grid-template-columns: repeat(3, 1fr);
  }
  .grid-four-column{
     grid-template-columns: 1fr 1.2fr .5fr .8fr ;
  }
  .grid-two-column-services{
    grid-template-columns: 20% 80%;
    // grid-template-columns: repeat(2, 1fr);
  }


.common-heading{
  font-size:3.2rem;
  font-weight:400;
  text-transform:capitalize;
  margin-bottom:6rem;
}



input, textarea{
  max-width: 50rem;
  color: ${({ theme }) => theme.colors.black};
  padding: 1.6rem 2.4rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  text-transform: uppercase;
 box-shadow: ${({ theme }) => theme.colors.shadowSupport};
}
  input[type="submit"]{
  max-width: 16rem;
  margin-top: 2rem;
  background-color: ${({ theme }) => theme.colors.btn};
  color: ${({ theme }) => theme.colors.white};
  padding: 1.4rem 2.2rem;
  border-style: solid;
  border-width: .1rem;
  text-transform: uppercase;
  font-size: 1.8rem;
  cursor: pointer;
  }
  
  /* ===========================================
  /* media queries  
  ======================================= */
  /* px  */
  /* rem  */
  /* em  */
  /* 1500px */
  //998px
  @media (max-width:${({ theme }) => theme.media.tab}) {
        .container{
          padding: 0 3.2rem;
        }
          .grid-three-column {
        grid-template-columns: 1fr 1fr;
      }
  }
  @media (max-width:${({ theme }) => theme.media.mobile}) {
        html{
          font-size: 50%;
        }
        .grid{
          gap: 3.2rem;
        }
        .grid-two-column, .grid-three-column, .grid-four-column{
          grid-template-columns: 1fr;
        }
  }
`;