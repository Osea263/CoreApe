import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import Web3 from "web3";
import Tilt from 'react-parallax-tilt';
import 'rsuite/styles/index.less';
import "rsuite/dist/rsuite.min.css";
import { Panel, PanelGroup } from 'rsuite';
import { Carousel } from 'rsuite';
import { Notification, toaster } from 'rsuite';
import { Loader } from 'rsuite';
import { Badge } from 'rsuite';
import { id } from "ethers/lib/utils";

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  font-family: 'coder';
  padding: 10px;
  font-size: 1rem;
  border-radius: 6px;
  border: none;
  background-color: black;
  padding: 10px;
  letter-spacing: 2px;
  font-weight: bold;
  color: white;
  width: 270px;
  height: 50px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px black;
  -webkit-box-shadow: 0px 6px 0px -2px black;
  -moz-box-shadow: 0px 6px 0px -2px black;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
  :hover {
    color: silver;
  }
  @media (max-width: 565px) {
    width: 200px;
    height: 50px;
    font-size: 0.75rem;
  }
`;

export const CTNButton = styled.button`
  font-family: 'coder';
  padding: 10px;
  font-size: 1rem;
  border-radius: 6px;
  border: none;
  background-color: black;
  padding: 10px;
  letter-spacing: 2px;
  font-weight: bold;
  color: white;
  width: 270px;
  height: 50px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px black;
  -webkit-box-shadow: 0px 6px 0px -2px black;
  -moz-box-shadow: 0px 6px 0px -2px black;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
  :hover {
    color: silver;
  }
  @media (max-width: 565px) {
    width: 200px;
    height: 50px;
    font-size: 0.75rem;
  }
`;

export const Maxbtn = styled.button`
  font-family: 'coder';
  font-size: 0.75rem;
  border-radius: 10px;
  background-color: #F48C2C;
  font-weight: bold;
  color: white;
  width: 80px;
  height: 30px;
  cursor: pointer;
  letter-spacing: 2px;
  :hover {
    color: black;
  }
  @media (max-width: 565px) {
    width: 200px;
    height: 50px;
    font-size: 0.75rem;
  }
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 10px;
  border: none;
  background-color: transparent;
  padding: 10px;
  font-weight: bold;
  font-size: 30px;
  color: white;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
  :hover {
    color: silver;
  }
`;

export const LogoDiv = styled.div`
display: flex;
align-items: center;
justify-content: center;
align-content: center;
gap: 10%;
width: 300px;
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column-reverse;

  align-items: center;
  margin: auto;
  
  width: 90%;

  border-radius: 40px;
 
    @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const ResponsiveWrapperHeader = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-height: 80px;
  padding: 10px;
  
  @media (min-width: 767px) {
    flex-direction: row;
  }
  @media (max-width: 565px) {
    max-height: 220px;
  }
`;

export const StyledLogo = styled.img`
  display: inline;
  
  @media (max-width: 767px) {
    width: 150px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledImg = styled.img`
  width: 250px;
  border-radius: 5px;
  @media (min-width: 900px) {
    width: 450px;
  }
  @media (min-width: 1000px) {
    width: 450px;
  }
  transition: width 0.5s;
  @media (max-width: 565px) {
    width: 200px;
  }
`;

export const Styledroad = styled.img`
  width: 100%;
  border-radius: 5px;
  transition: width 0.5s;
`;

export const StyledImgSmall = styled.img`
  width: 220px;
  height: 220px;
  border-radius: 5px;
  @media (min-width: 900px) {
    width: 220px;
    height: 220px;
  }
  @media (min-width: 1000px) {
    width: 220px;
    height: 220px;
  }
  transition: width 0.5s;
  @media (max-width: 565px) {
    width: 200px;
  }
`;

export const StyledLink = styled.a`
  color: blue;
  text-decoration: none;

`;

export const WalletBox = styled.div`
  text-decoration: none;
  border-radius: 10px;
  border: 2px solid white;
  background-color: transparent;
  //padding: 10px;
  font-weight: bold;
  font-size: 15px;
  width: 180px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px white;
  -webkit-box-shadow: 0px 4px 0px -2px white;
  -moz-box-shadow: 0px 4px 0px -2px white;
  @media (max-width: 565px) {
    margin-top: 20px;
  
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [walletAddress, setAddress] = useState("Not Connected");
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(``);
  const [tokens, settokens] = useState(1);
  const [brd, setbrd] = useState("2px solid #FFFFFF");
  const [bxsh, setbxsh] = useState("0px 0px 3px 0px #FFFFFF");
  const [DOT, setDOT] = useState("red");
  const [type, setType] = React.useState('info');
  const [placement, setPlacement] = React.useState('topStart');
  const errmessage = (
    <Notification type={'error'} header={'error'} closable>
     Sorry, something went wrong please try again later.
    </Notification>
  );
  const txmessage = (
    <Notification type={'success'} header={'success'} closable>
     Congrats, Mint Was successfull.
    </Notification>
  );
  const mntmessage = (
    <Notification type={'info'} header={'success'} closable>
     <Loader/> Minting in Progress....
    </Notification>
  );
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    DISPLAY_COST: 0,
    WL_Display: 0,
    GAS_LIMIT: 0,
    MAX_PER_TX: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    Telegram: "",
    Discord: "",
    Twitter: "",
    SHOW_BACKGROUND: false,
  });

  const claimNFTs = () => {
    let cost = CONFIG.DISPLAY_COST * tokens;
    let price = Web3.utils.toWei(cost.toString(), 'ether');
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalGasLimit = String(gasLimit);
    console.log("Cost: ", price);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    setbrd("2px solid yellow");
    setbxsh("0px 0px 3px 0px yellow");
    toaster.push(mntmessage, { placement })
    blockchain.smartContract.methods
      .mint(tokens)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: price,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
        toaster.push(errmessage, { placement })
        setbrd("2px solid red");
        setbxsh("0px 0px 3px 0px red");
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `Your ${CONFIG.NFT_NAME} is minted successfull! Visit Youngparrot to view it.`
        );
        toaster.push(txmessage, { placement })
        setbrd("2px solid green");
        setbxsh("0px 0px 3px 0px green");
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const decrementtokens = () => {
    let newtokens = tokens - 1;
    if (newtokens < 1) {
      newtokens = 1;
    }
    settokens(newtokens);
  };

  const incrementtokens = () => {
    let newtokens = tokens + 1;
    if (newtokens > CONFIG.MAX_PER_TX) {
      newtokens = CONFIG.MAX_PER_TX;
    }
    settokens(newtokens);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
      setAddress(blockchain.account.substring(0,4) + "..." + blockchain.account.substring(38,42));
      setDOT("green");
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <s.Screen>
      <s.Container
        flex={1}
        // ai={"center"}
        style={{backgroundColor: "var(--primary)" }}
       
      >
        <s.Container
         style={{backgroundColor: "var(--primary)" }}
         image={CONFIG.SHOW_BACKGROUND ? "/config/images/bg-animation.svg" : null}
         >
          <ResponsiveWrapperHeader>

            <LogoDiv>
            <a href="#" target={"_blank"}>
              <StyledLogo alt={"logo"} src={"/config/images/logo.pn"} />
            </a>
            </LogoDiv>

            <s.Headerlinks>
            <s.StyledLink href="#About">
                About
                </s.StyledLink>
              <s.StyledLink href="#sneak">
                Sneak Peaks
                </s.StyledLink>

                <s.StyledLink href="#marketplace">
                Marketplace
                </s.StyledLink>
                <s.StyledLink href="#faq">
                FAQ
                </s.StyledLink>
            </s.Headerlinks>



            <s.HeaderDiv>
            <s.socialDiv>
            <a href={CONFIG.Telegram} target={"_blank"}>
            <s.Icons src="/config/images/telegram.svg" alt="telegram" />
            </a>
              <a href={CONFIG.Twitter} target={"_blank"}>
            <s.Icons src="/config/images/twitter.svg" alt="twitter" />
            </a>
            <a href={CONFIG.Discord} target={"_blank"}>
            <s.Icons src="/config/images/discord.svg" alt="discord" />
            </a>
            <a href={CONFIG.MARKETPLACE_LINK} target={"_blank"}>
            <s.Icons src="/config/images/Youngparrot.png" alt="Youngparrot" />
            </a>
            </s.socialDiv>
            <WalletBox>
              {blockchain.account !== "" ? (
              <>
              <s.TextSubTitle style={{fontSize: "1rem", color: "white"}}>
              <Badge color={DOT}/> {walletAddress}
                </s.TextSubTitle>
              </>
              ) : null }
            </WalletBox>
            </s.HeaderDiv>

          </ResponsiveWrapperHeader>
        <s.SpacerLarge/>

      
    
        <s.SpacerSmall />
        <ResponsiveWrapper flex={3} style={{ padding: 24 }} >
         
         
         <s.Container
           flex={2}
           jc={"center"}
          
         >
         
             <s.TextTitle>
             <s.TextDescription
             style={{
               fontSize: 16 ,
             }}
           >
            Whitelist
           </s.TextDescription>
              Mint {CONFIG.NFT_NAME}
           </s.TextTitle>
           <s.TextDescription
             style={{
               fontSize: 16 ,
             }}
           >
             {data.totalSupply} / {CONFIG.MAX_SUPPLY}
           </s.TextDescription>
           <s.TextDescription
             style={{
               textAlign: "center",
               color: "var(--primary-text)",
               fontSize: 16 ,
             }}
           >
             <StyledLink target={"_blank"} href={CONFIG.SCAN_LINK}>
               {truncate(CONFIG.CONTRACT_ADDRESS, 15)}
             </StyledLink>
           </s.TextDescription>
           <s.SpacerSmall />
           {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
             <>
               <s.TextTitle
                 style={{ textAlign: "center", color: "var(--accent-text)" }}
               >
                 MINT OUT!!.
               </s.TextTitle>
               <s.TextDescription
                 style={{ textAlign: "center", color: "var(--accent-text)" }}
               >
                 Trade {CONFIG.NFT_NAME} on
               </s.TextDescription>
               <s.SpacerSmall />
               <StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                 {CONFIG.MARKETPLACE}
               </StyledLink>
             </>
           ) : (
             <>
               <s.TextTitle
                 style={{ textAlign: "center", color: "var(--accent-text)",  fontSize: 24, }}
               >
                 1 {CONFIG.SYMBOL} costs {CONFIG.DISPLAY_COST}  {CONFIG.NETWORK.SYMBOL}, Excluding gas fees. {" "}
                .
               </s.TextTitle>
               <s.SpacerSmall />
               {blockchain.account === "" ||
               blockchain.smartContract === null ? (
                 <s.Container  jc={"center"}>
                   <s.TextDescription
                     style={{
                       textAlign: "center",
                       color: "var(--accent-text)",
                       fontSize: 24,
                     }}
                   >
                     Connect to the {CONFIG.NETWORK.NAME} network
                   </s.TextDescription>
                   <s.SpacerSmall />
                   <CTNButton
                   jc={"center"}
                   ai={"center"}
                     onClick={(e) => {
                       e.preventDefault();
                       dispatch(connect());
                       getData();
                     }}
                     style={{
                       fontSize: 16,
                     }}
                     
                   >
                     CONNECT
                     <img style={{width: 30, paddingLeft: 10 }} src={"/config/images/mm.svg"} />
                   </CTNButton>
                   {blockchain.errorMsg !== "" ? (
                     <>
                       <s.SpacerSmall />
                       <s.TextDescription
                         style={{
                           textAlign: "center",
                           color: "var(--accent-text)",
                         }}
                       >
                         {blockchain.errorMsg}
                       </s.TextDescription>
                     </>
                   ) : null}
                 </s.Container>
               ) : (
                 <>
                   <s.TextDescription
                     style={{
                       textAlign: "center",
                       color: "var(--accent-text)",
                     }}
                   >
                     {feedback}
                   </s.TextDescription>
                   <s.SpacerMedium />
                   <s.Container ai={"center"} jc={"center"} fd={"row"}>
                     <StyledRoundButton
                       style={{ lineHeight: 0.4 }}
                       disabled={claimingNft ? 1 : 0}
                       onClick={(e) => {
                         e.preventDefault();
                         decrementMintAmount();
                       }}
                     >
                       -
                     </StyledRoundButton>
                     <s.SpacerMedium />
                     <s.TextDescription
                       style={{
                         textAlign: "center",
                         color: "var(--accent-text)",
                       }}
                     >
                       {mintAmount}
                     </s.TextDescription>
                     <s.SpacerMedium />
                     <StyledRoundButton
                       disabled={claimingNft ? 1 : 0}
                       onClick={(e) => {
                         e.preventDefault();
                         incrementMintAmount();
                       }}
                     >
                       +
                     </StyledRoundButton>
                   </s.Container>
                   <s.SpacerSmall />
                   <s.Container ai={"center"} jc={"center"} fd={"row"}>
                     <StyledButton
                       disabled={claimingNft ? 1 : 0}
                       onClick={(e) => {
                         e.preventDefault();
                         claimNFTs();
                         getData();
                       }}
                     >
                       {claimingNft ? "Minting" : "MINT"}
                     </StyledButton>
                   </s.Container>
                 </>
               )}
             </>
           )}
           <s.SpacerMedium />
         </s.Container>
         <s.SpacerLarge />

         <Tilt className="parallax-effect rgb"  >
            <s.Container flex={1}
           jc={"center"}
           ai={"center"}
           className="inner-element"
           style={{
             backgroundColor: "var(--primary)",
             borderRadius: 24,
             // border: "4px dashed var(--secondary)",
             boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)",
           }}>
               <StyledImg alt={"example"} src={"/config/images/hoo.png"} />
         </s.Container>
         </Tilt>
         
         {/* <s.Container flex={1} jc={"center"} ai={"center"}>
           <StyledImg
             alt={"example"}
             src={"/config/images/example.png"}
             style={{ transform: "scaleX(-1)" }}
           />
         </s.Container> */}
       </ResponsiveWrapper>

       </s.Container>


        <s.SpacerLarge />
        <s.SecContainer id="About">
        <s.TextTitle>
        About
            </s.TextTitle>
            <s.SpacerLarge/>
            <s.TextP>

            WELCOME TO THE
CORE APE YACHT CLUB
<br></br><br></br>
CAYC is a collection of 10,000 Core Ape NFTs—unique digital collectibles living on the Core blockchain. Your Core Ape reps as your CoreSea Yacht Club membership card, and grants access to members-only benefits, the first of which is early access to CoreSea MARKETPLACE, Future Airdrops,and perks which can be unlocked by the community through roadmap activation.           
</s.TextP>
            </s.SecContainer>

            <s.SecContainer id="sneak">
            <s.TextTitle>
            Sneak Peaks
            </s.TextTitle>
            <s.SpacerLarge/>
            <s.CBOX>
            <Carousel autoplay className="custom-slider">
    <img src="/config/images/1.jpg" />
    <img src="/config/images/2.jpg" />
    <img src="/config/images/3.jpg" />
    <img src="/config/images/4.jpg" />
    <img src="/config/images/5.jpg" />
  </Carousel>
  </s.CBOX>
              </s.SecContainer>

              <s.SecContainer id="marketplace">
        <s.TextTitle>
        MARKETPLACE
            </s.TextTitle>
            <s.SpacerLarge/>
            <s.TextP>
              COMING SOON
            </s.TextP>
            <StyledImg alt={"example"} src={"/config/images/marketplace.jpg"} className="market"  />
            </s.SecContainer>

            <s.SecContainer id="faq">
            <s.TextTitle>
            FAQ
            </s.TextTitle>
            <s.SpacerLarge/>
            <PanelGroup style={{width: "80%", borderColor: "#A9D0D2"}} accordion bordered>
    <Panel header="What is CoreApeYatchClub?" defaultExpanded>
    <s.TextP style={{textAlign: "left"}}>
          10,000 CoreApe Collection living on Core Blockchain
          </s.TextP>
    </Panel>
    <Panel header="How can i Mint?">
    <s.TextP style={{textAlign: "left"}}>
    Connect your Metamask wallet, and click mint
          </s.TextP>
    </Panel>
    <Panel header="What is the Supply?">
    <s.TextP style={{textAlign: "left"}}>
    10,000
          </s.TextP>
    </Panel>
    <Panel header="Max Mint?">
    <s.TextP style={{textAlign: "left"}}>
    10 per Wallet
          </s.TextP>
    </Panel>
  </PanelGroup>
            </s.SecContainer>



            <s.SecContainer id="">
                <s.socialDiv>
          <a href={CONFIG.Telegram} target={"_blank"}>
          <s.Icons src="/config/images/telegram.svg" alt="telegram" />
          </a>
            <a href={CONFIG.Twitter} target={"_blank"}>
          <s.Icons src="/config/images/twitter.svg" alt="twitter" />
          </a>
          <a href={CONFIG.Discord} target={"_blank"}>
          <s.Icons src="/config/images/discord.svg" alt="discord" />
          </a>
          <a href={CONFIG.MARKETPLACE_LINK} target={"_blank"}>
          <s.Icons src="/config/images/Youngparrot.png" alt="Youngparrot" />
          </a>
          </s.socialDiv>
          <s.SpacerLarge/>
          <s.TextP>
          Copyright © 2022 {CONFIG.NFT_NAME}
          </s.TextP>
            </s.SecContainer>




        <s.SpacerMedium />
      </s.Container>
    </s.Screen>
  );
}

export default App;
