import React, { useState } from "react";
import { Dimensions, Keyboard, ScrollView, Platform, Alert, SafeAreaView } from "react-native";

import {router} from "expo-router";
import { useDispatch } from "react-redux";
import styled, { useTheme } from "styled-components/native";
import ethService from "../../../services/EthereumService";
import { ThemeType } from "../../../styles/theme";
import {
  saveEthereumAddresses,
  fetchEthereumBalance,
  fetchEthereumTransactions,
} from "../../../store/ethereumSlice";
import { GeneralStatus } from "../../../store/types";
import type { AddressState } from "../../../store/types";
import type { AppDispatch } from "../../../store";
import Button from "../../../components/Button/Button";
import { ROUTES } from "../../../constants/routes";
import { Subtitle, Title } from "../../../components/Styles/Text.styles";
import { ErrorTextCenter, ErrorTextContainer } from "../../../components/Styles/Errors.styles";

const isAndroid = Platform.OS === "android";

const SafeAreaContainer = styled(SafeAreaView)<{ theme: ThemeType }>`
  flex: 1;
  background-color: ${(props) => props.theme.colors.lightDark};
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.View<{ theme: ThemeType }>`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.spacing.medium};
  margin-top: ${(props) => isAndroid && props.theme.spacing.huge};
`;

const TextContainer = styled.View<{ theme: ThemeType }>`
  margin-bottom: ${(props) => props.theme.spacing.huge};
`;

const ButtonContainer = styled.View<{ theme: ThemeType }>`
  padding-left: ${(props) => props.theme.spacing.large};
  padding-right: ${(props) => props.theme.spacing.large};
  padding-bottom: ${(props) => props.theme.spacing.large};
  padding-top: ${(props) => props.theme.spacing.small};
  width: 100%;
`;

const PrivateKeyInput = styled.TextInput<{ theme: ThemeType; isFocused: boolean }>`
  padding: ${(props) => props.theme.spacing.large};
  margin: ${(props) => props.theme.spacing.large};
  background-color: ${(props) => props.theme.colors.dark};
  border-radius: ${(props) => props.theme.borderRadius.extraLarge};
  width: ${(Dimensions.get("window").width - 80).toFixed(0)}px;
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.fonts.sizes.large};
  border: 1px solid
    ${({ theme, isFocused }) => (isFocused ? theme.colors.primary : theme.colors.grey)};
`;

export default function WalletImportPrivateKey() {
    const theme = useTheme();
    const dispatch = useDispatch<AppDispatch>();
    const [privateKey, setPrivateKey] = useState<string>("");
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
  
    const handleImportPrivateKey = async () => {
      try {
        setLoading(true); // Ativa o estado de loading
  
        const wallet = await ethService.importWalletFromPrivateKey(privateKey);
  
        const importedAddress: AddressState = {
          accountName: "Imported Wallet",
          derivationPath: "N/A",
          address: wallet.address,
          publicKey: wallet.publicKey,
          balance: 0,
          transactionMetadata: {
            paginationKey: undefined,
            transactions: [],
          },
          failedNetworkRequest: false,
          status: GeneralStatus.Idle,
          transactionConfirmations: [],
        };
  
        dispatch(saveEthereumAddresses([importedAddress]));
        dispatch(fetchEthereumBalance(wallet.address));
        dispatch(fetchEthereumTransactions({ address: wallet.address }));
  
        router.push({
          pathname: ROUTES.walletCreatedSuccessfully,
          params: { successState: "IMPORTED_PRIVATE_KEY" },
        });
      } catch (error) {
        setError("Failed to import wallet. Please check your private key.");
        console.error("Wallet import error:", error);
      } finally {
        setLoading(false); // Desativa o estado de loading
      }
    };
  
    return (
      <SafeAreaContainer>
        <ScrollView contentContainerStyle={{ paddingVertical: 50 }}>
          <ContentContainer>
            <TextContainer>
              <Title>Import Wallet with Private Key</Title>
              <Subtitle>Enter your private key below to import your wallet.</Subtitle>
            </TextContainer>
            <PrivateKeyInput
              value={privateKey}
              onChangeText={setPrivateKey}
              placeholder="Enter your private key"
              placeholderTextColor={theme.colors.grey}
              secureTextEntry
              autoCapitalize="none"
              isFocused={isFocused}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onSubmitEditing={() => Keyboard.dismiss()}
            />
          </ContentContainer>
        </ScrollView>
        {error && (
          <ErrorTextContainer>
            <ErrorTextCenter>{error}</ErrorTextCenter>
          </ErrorTextContainer>
        )}
        <ButtonContainer>
          <Button
            linearGradient={theme.colors.primaryLinearGradient}
            loading={loading}
            disabled={loading}
            color={theme.colors.white}
            backgroundColor={theme.colors.primary}
            onPress={handleImportPrivateKey} // Agora é uma função sem argumentos
            title="Import Private Key"
          />
        </ButtonContainer>
      </SafeAreaContainer>
    );
  }
  