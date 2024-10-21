import { useEffect, useState } from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { router, Link } from "expo-router";
import styled, { useTheme } from "styled-components/native";
import { ROUTES } from "../../constants/routes";
import type { ThemeType } from "../../styles/theme";
import type { RootState, AppDispatch } from "../../store";
import {
  fetchEthereumBalance,
  updateSolanaBalance,
} from "../../store/walletSlice";
// import { fetchCryptoPrices } from "../../utils/fetchCryptoPrices";
import { formatDollar } from "../../utils/formatDollars";
import { getSolanaBalance } from "../../utils/getSolanaBalance";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import SendIcon from "../../assets/svg/send.svg";
import ReceiveIcon from "../../assets/svg/receive.svg";
import CryptoInfoCard from "../../components/CryptoInfoCard/CryptoInfoCard";
import SolanaIcon from "../../assets/svg/solana.svg";
import EthereumIcon from "../../assets/svg/ethereum.svg";

const SafeAreaContainer = styled(SafeAreaView)<{ theme: ThemeType }>`
  flex: 1;
  background-color: ${(props) => props.theme.colors.dark};
  justify-content: flex-end;
`;

const ContentContainer = styled.View<{ theme: ThemeType }>`
  flex: 1;
  justify-content: flex-start;
  padding: ${(props) => props.theme.spacing.large};
`;

const BalanceContainer = styled.View<{ theme: ThemeType }>`
  margin-top: 10px;
  margin-bottom: ${(props) => props.theme.spacing.huge};
`;

const BalanceText = styled.Text<{ theme: ThemeType }>`
  font-family: ${(props) => props.theme.fonts.families.openBold};
  font-size: ${(props) => props.theme.fonts.sizes.uberHuge};
  color: ${(props) => props.theme.fonts.colors.primary};
  text-align: center;
`;

const ActionContainer = styled.View<{ theme: ThemeType }>`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: ${(props) => props.theme.spacing.medium};
`;

const CryptoInfoCardContainer = styled.View<{ theme: ThemeType }>`
  flex: 1;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const CardView = styled.View<{ theme: ThemeType }>`
  margin-bottom: ${(props) => props.theme.spacing.medium};
  width: 100%;
`;

const SectionTitle = styled.Text<{ theme: ThemeType }>`
  font-family: ${(props) => props.theme.fonts.families.openBold};
  font-size: ${(props) => props.theme.fonts.sizes.title};
  color: ${(props) => props.theme.fonts.colors.primary};
  margin-bottom: ${(props) => props.theme.spacing.medium};
  margin-left: ${(props) => props.theme.spacing.small};
`;

export default function Index() {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const ethWalletAddress = useSelector(
    (state: RootState) => state.wallet.ethereum.address
  );
  const ethBalance = useSelector(
    (state: RootState) => state.wallet.ethereum.balance
  );
  const solWalletAddress = useSelector(
    (state: RootState) => state.wallet.solana.address
  );
  const solBalance = useSelector(
    (state: RootState) => state.wallet.solana.balance
  );
  const [usdBalance, setUsdBalance] = useState(0);
  const [solUsd, setSolUsd] = useState(0);
  const [ethUsd, setEthUsd] = useState(0);

  const ethPriceMock = 3006.94;
  const solPriceMock = 127.22;

  useEffect(() => {
    const fetchSolanaBalance = async () => {
      const currentSolBalance = await getSolanaBalance(solWalletAddress);
      dispatch(updateSolanaBalance(currentSolBalance));
    };

    if (ethWalletAddress) {
      dispatch(fetchEthereumBalance(ethWalletAddress));
    }

    if (solWalletAddress) {
      fetchSolanaBalance();
    }
  }, [ethWalletAddress, dispatch]);

  useEffect(() => {
    const fetchPrices = async () => {
      // const prices = await fetchCryptoPrices();
      // setUsdBalance(prices.ethereum.usd * ethBalance);
      const ethUsd = ethPriceMock * ethBalance;
      const solUsd = solPriceMock * solBalance;

      setUsdBalance(ethUsd + solUsd);
      setEthUsd(ethUsd);
      setSolUsd(solUsd);
    };

    fetchPrices();
  }, [ethBalance, solBalance]);

  // console.log("eth address", ethWalletAddress);
  // console.log("eth balance", ethBalance);
  // console.log("sol address", solWalletAddress);
  // console.log("sol balance", solBalance);
  // console.log("usd balance", usdBalance);
  return (
    <SafeAreaContainer>
      <ScrollView>
        <ContentContainer>
          <BalanceContainer>
            <BalanceText>{formatDollar(usdBalance)}</BalanceText>
          </BalanceContainer>
          <ActionContainer>
            <PrimaryButton
              icon={
                <SendIcon width={25} height={25} fill={theme.colors.primary} />
              }
              onPress={() => router.push(ROUTES.sendOptions)}
              btnText="Send"
            />
            <View style={{ width: 15 }} />
            <PrimaryButton
              icon={
                <ReceiveIcon
                  width={25}
                  height={25}
                  fill={theme.colors.primary}
                />
              }
              onPress={() => router.push(ROUTES.receive)}
              btnText="Receive"
            />
          </ActionContainer>
          <SectionTitle>Assets</SectionTitle>
          <CryptoInfoCardContainer>
            <CardView>
              <Link href={ROUTES.ethDetails}>
                <CryptoInfoCard
                  title="Ethereum"
                  caption={`${ethBalance} ETH`}
                  details={formatDollar(ethUsd)}
                  icon={
                    <EthereumIcon
                      width={35}
                      height={35}
                      fill={theme.colors.white}
                    />
                  }
                />
              </Link>
            </CardView>
            <CardView>
              <Link href={ROUTES.solDetails}>
                <CryptoInfoCard
                  title="Solana"
                  caption={`${solBalance} SOL`}
                  details={formatDollar(solUsd)}
                  icon={<SolanaIcon width={25} height={25} fill="#14F195" />}
                />
              </Link>
            </CardView>
          </CryptoInfoCardContainer>
        </ContentContainer>
      </ScrollView>
    </SafeAreaContainer>
  );
}
