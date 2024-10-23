/* eslint-disable @typescript-eslint/no-explicit-any */
// Copyright (c) RoochNetwork
// SPDX-License-Identifier: Apache-2.0
// Author: Jason Jo

import { LoadingButton } from "@mui/lab";
import { Button, Chip, Drawer, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Args, Transaction } from "@roochnetwork/rooch-sdk";
import {
  UseSignAndExecuteTransaction,
  useConnectWallet,
  useCreateSessionKey,
  useCurrentAddress,
  useCurrentSession,
  useRemoveSession,
  useRoochClientQuery,
  useWalletStore,
  useWallets,
} from "@roochnetwork/rooch-sdk-kit";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import CountUp from "react-countup";
import "./App.css";
import { useRccOwner } from "./hooks/useRccOwner";
import { fNumber, shortAddress } from "./utils";

function getNextRewardClick(currentClicks: number): number {
  const remainder = currentClicks % 21;
  if (remainder === 0) {
    return currentClicks + 21;
  } else {
    return currentClicks + (21 - remainder);
  }
}

const drawerWidth = 300;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  alignItems: "center",
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `${open ? drawerWidth : "0"}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// Publish address of the counter contract
const counterAddress =
  "0x872502737008ac71c4c008bb3846a688bfd9fa54c6724089ea51b72f813dc71e";

const roochCounterObject =
  "0x24e093a6fa4698d1b6efd27ae9f1c21057b91bb9a2ef3c0fce2c94b44601764b";

const treasuryObject =
  "0xe7beeda989fa0b2201c945310d533c82027c3270a39e2bcbaa65c4563210db82";

const treasuryOwnerAddress =
  "rooch1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqhxqaen";

const rccCoinType =
  "0x872502737008ac71c4c008bb3846a688bfd9fa54c6724089ea51b72f813dc71e::rooch_clicker_coin::RCC";

export const rccCoinStoreType =
  "0x3::coin_store::CoinStore<0x872502737008ac71c4c008bb3846a688bfd9fa54c6724089ea51b72f813dc71e::rooch_clicker_coin::RCC>";

const roochFishAddress =
  "0xb8b4ee4df7fb3e09b203eb585f4116e7eb728ec344d45b4885b44cd5719b7232";

const gameStateObjectID = "0xe7c37dec17c51074c4c8aa721fd5f5b8de573bf3f02fbec883f78cd0af7acbcc";

function App() {
  const wallets = useWallets();
  const currentAddress = useCurrentAddress();
  const sessionKey = useCurrentSession();
  const connectionStatus = useWalletStore((state) => state.connectionStatus);
  const setWalletDisconnected = useWalletStore(
    (state) => state.setWalletDisconnected
  );
  const { mutateAsync: connectWallet } = useConnectWallet();

  const { mutateAsync: createSessionKey } = useCreateSessionKey();
  const { mutateAsync: removeSessionKey } = useRemoveSession();
  const { mutateAsync: signAndExecuteTransaction } =
    UseSignAndExecuteTransaction();

  const { rccOwnerList } = useRccOwner();

  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const { data, refetch } = useRoochClientQuery(
    "getStates",
    {
      accessPath: `/object/${gameStateObjectID}`,
      stateOption: {
        decode: true,
      },
    },
    { refetchInterval: 3000 }
  );

  console.log("game-state:", data);
  
  const { data: RCCBalance, refetch: refetchRCCBalance } = useRoochClientQuery(
    "getBalance",
    {
      owner: currentAddress?.genRoochAddress().toStr() || "",
      coinType: rccCoinType,
    }
  );

  const [sessionLoading, setSessionLoading] = useState(false);
  const [txnLoading, setTxnLoading] = useState(false);
  const handlerCreateSessionKey = async () => {
    if (sessionLoading) {
      return;
    }
    setSessionLoading(true);

    const defaultScopes = [`${counterAddress}::*::*`];
    createSessionKey(
      {
        appName: "rooch_clicker",
        appUrl: "http://localhost:5173",
        maxInactiveInterval: 3600,
        scopes: defaultScopes,
      },
      {
        onSuccess: (result) => {
          console.log("session key", result);
        },
        onError: (error) => {
          if (String(error).includes("1004")) {
            enqueueSnackbar("Insufficient gas, please claim gas first", {
              variant: "warning",
              action: (
                <a
                  href="https://rooch.network/build/getting-started/get-gas-coin"
                  target="_blank"
                >
                  <Chip
                    size="small"
                    label="Get Rooch Testnet Coin"
                    variant="filled"
                    className="font-semibold !text-slate-50 min-h-10"
                    sx={{
                      background: "#000",
                      borderRadius: "12px",
                      cursor: "pointer",
                    }}
                  />
                </a>
              ),
            });
          } else {
            enqueueSnackbar(String(error), {
              variant: "warning",
            });
          }
        },
      }
    ).finally(() => setSessionLoading(false));
  };

  return (
    <Stack
      className="font-sans min-w-[1024px]"
      direction="column"
      sx={{
        minHeight: "calc(100vh - 4rem)",
      }}
    >
      <Stack justifyContent="space-between" className="w-full">
        <img src="./rooch_black_combine.svg" width="120px" alt="" />
        <Stack spacing={1} justifyItems="flex-end">
          <Chip
            label="Rooch Testnet"
            variant="filled"
            className="font-semibold !bg-slate-950 !text-slate-50 min-h-10"
          />
          <a
            href="https://rooch.network/build/getting-started/get-gas-coin"
            target="_blank"
          >
            <Chip
              label="Get Rooch Testnet Coin"
              variant="filled"
              className="font-semibold !text-slate-50 min-h-10"
              sx={{
                background: "#006BE6",
                borderRadius: "12px",
                cursor: "pointer",
              }}
            />
          </a>
          <Button
            variant="outlined"
            onClick={async () => {
              if (connectionStatus === "connected") {
                setWalletDisconnected();
                return;
              }
              await connectWallet({ wallet: wallets[0] });
            }}
          >
            {connectionStatus === "connected"
              ? shortAddress(currentAddress?.toStr(), 8, 6)
              : "Connect Wallet"}
          </Button>
        </Stack>
      </Stack>
      <Stack className="w-full" justifyContent="space-between">
        <Stack>
          <Typography className="text-4xl font-semibold mt-6 text-left w-full mb-4">
            Rooch Clicker |{" "}
            {RCCBalance && (
              <span className="text-2xl">
                Balance: {fNumber(RCCBalance.balance.toString())} RCC{" "}
                <span className="text-xs ml-2">( Rooch Clicker Coin )</span>
              </span>
            )}
          </Typography>
        </Stack>{" "}
        <Stack className="w-1/3" justifyContent="flex-end">
          {!sessionKey ? (
            <LoadingButton
              loading={sessionLoading}
              variant="contained"
              className="!mt-4"
              disabled={connectionStatus !== "connected"}
              onClick={() => {
                handlerCreateSessionKey();
              }}
            >
              {connectionStatus !== "connected"
                ? "Please connect wallet first"
                : "Create Session Key"}
            </LoadingButton>
          ) : (
            <Button
              variant="contained"
              className="!mt-4"
              onClick={() => {
                removeSessionKey({ authKey: sessionKey.getAuthKey() });
              }}
            >
              Clear Session Key
            </Button>
          )}
        </Stack>
      </Stack>
      <Stack
        className="mt-4 w-full font-medium "
        direction="column"
        alignItems="center"
      >
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              marginTop: "168px",
              height: "calc(100% - 168px)",
              background: "transparent",
              p: 2,
            },
          }}
          variant="persistent"
          anchor="left"
          open={showLeaderboard}
        >
          <Stack>
            <Typography className="text-xl font-semibold">
              Leaderboard
            </Typography>
          </Stack>
          <Stack direction="column" className="mt-4" spacing={1.5}>
            {rccOwnerList
              ?.filter((i) => i.owner !== treasuryOwnerAddress)
              .sort((a, b) => {
                return (
                  Number((b.decoded_value?.value.balance as any).value.value) -
                  Number((a.decoded_value?.value.balance as any).value.value)
                );
              })
              .map((i) => {
                return (
                  <Stack
                    className="w-full"
                    justifyContent="space-between"
                    sx={{
                      fontWeight:
                        i.owner === currentAddress?.genRoochAddress().toStr()
                          ? 700
                          : 500,
                    }}
                  >
                    <Typography>
                      {shortAddress(i.owner_bitcoin_address, 6, 6)}
                    </Typography>
                    <Typography
                      style={{
                        fontVariantNumeric: "tabular-nums lining-nums",
                      }}
                    >
                      {fNumber(
                        Number(
                          (i.decoded_value?.value.balance as any).value.value
                        )
                      )}
                    </Typography>
                  </Stack>
                );
              })}
          </Stack>
        </Drawer>
        <Main open={showLeaderboard}>
          <Stack
            spacing={2}
            className="text-xl w-full text-center items-center justify-center"
          >
            <Typography>Join our Click Challenge!</Typography>
            <Typography>
              Every time you hit a multiple of{" "}
              <span className="font-semibold">21</span>,
            </Typography>
            <Typography>You're in for 1,000 RCC!</Typography>
          </Stack>
          <Button
            className="!mt-4"
            onClick={() => {
              setShowLeaderboard(!showLeaderboard);
            }}
            variant="outlined"
          >
            Leaderboard
          </Button>
          <Typography className="text-base !mt-4">
            Global Clicker Counter:{" "}
          </Typography>
          <Typography className="text-base">
            Next Bonus Click:{" "}
            {getNextRewardClick(
              Number(
                data?.[0].decoded_value?.value.global_click_count.toString()
              )
            )}{" "}
          </Typography>
          <Typography
            className="tracking-wide font-black"
            sx={{
              fontSize: showLeaderboard ? "160px" : "240px",
            }}
            onClick={async () => {
              if (!sessionKey) {
                return;
              }
              try {
                setTxnLoading(true);
                const txn = new Transaction();
                txn.callFunction({
                  address: counterAddress,
                  module: "clicker",
                  function: "click",
                  args: [
                    // rooch counter
                    Args.objectId(roochCounterObject),
                    // treasury
                    Args.objectId(treasuryObject),
                  ],
                });
                await signAndExecuteTransaction({ transaction: txn });
                await Promise.all([refetch(), refetchRCCBalance()]);
              } catch (error) {
                console.error(String(error));
              } finally {
                setTxnLoading(false);
              }
            }}
          >
            <CountUp
              style={{
                fontVariantNumeric: "tabular-nums lining-nums",
                userSelect: "none",
                cursor: "pointer",
              }}
              preserveValue
              duration={3}
              decimal=","
              end={Number(
                data?.[0].decoded_value?.value.global_click_count.toString() ||
                  0
              )}
            />
          </Typography>
          <LoadingButton
            loading={txnLoading}
            variant="contained"
            className="w-32"
            // fullWidth
            disabled={!sessionKey}
            onClick={async () => {
              try {
                setTxnLoading(true);
                const txn = new Transaction();
                txn.callFunction({
                  address: counterAddress,
                  module: "clicker",
                  function: "click",
                  args: [
                    // rooch counter
                    Args.objectId(roochCounterObject),
                    // treasury
                    Args.objectId(treasuryObject),
                  ],
                });
                await signAndExecuteTransaction({ transaction: txn });
                await Promise.all([refetch(), refetchRCCBalance()]);
              } catch (error) {
                console.error(String(error));
                if (String(error).includes("1004")) {
                  enqueueSnackbar("Insufficient gas, please claim gas first", {
                    variant: "warning",
                  });
                } else {
                  enqueueSnackbar(String(error), {
                    variant: "warning",
                  });
                }
              } finally {
                setTxnLoading(false);
              }
            }}
          >
            {sessionKey ? "Click!!!" : "Please create Session Key first"}
          </LoadingButton>
        </Main>
      </Stack>
    </Stack>
  );
}

export default App;
