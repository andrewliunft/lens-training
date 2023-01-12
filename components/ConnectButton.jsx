import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { watchNetwork } from "@wagmi/core";

export const ConnectBtn = ({ theme }) => {
  const { address, isConnected, connector: activeConnector } = useAccount();
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button">
                    <div className="border-gray-500/50 border-[2px] rounded-xl py-1 px-2 text-slate-500">
                      Connect Wallet
                    </div>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    <div className="border-gray-500/50 border-[2px] rounded-xl py-1 px-2 text-slate-500">
                      Wrong Network
                    </div>
                  </button>
                );
              }

              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 24,
                          height: 24,
                          borderRadius: 999,
                          overflow: "hidden",
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 24, height: 24 }}
                          />
                        )}
                      </div>
                    )}
                  </button>
                  {theme == "dark" ? (
                    <button onClick={openAccountModal} type="button">
                      <div className="rounded-md bg-gradient-to-r from-pink-500/50 via-red-500/50 to-yellow-500/50 p-[2px]">
                        <div className="flex flex-col justify-center items-center rounded-md bg-[#0F0F0F] mx-auto py-1 px-2 text-white">
                          {account.displayName}
                        </div>
                      </div>
                    </button>
                  ) : (
                    <button onClick={openAccountModal} type="button">
                      <div className="rounded-md bg-gradient-to-r from-pink-500/50 via-red-500/50 to-yellow-500/50 p-[2px]">
                        <div className="flex flex-col justify-center items-center rounded-md bg-white mx-auto py-1 px-2 text-black">
                          {account.displayName}
                        </div>
                      </div>
                    </button>
                  )}
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
