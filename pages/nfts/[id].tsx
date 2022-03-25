import React from 'react'
import Header from '../../components/header'
import { useEffect, useMemo, useState } from 'react'
import { useWeb3 } from '@3rdweb/hooks'
import { NFTMetadata, ThirdwebSDK } from '@3rdweb/sdk'
import { useRouter } from 'next/router'
import NFTImage from '../../components/nfts/nftImage'
import ItemActivity from '../../components/nfts/itemActivity'
import GeneralDetails from '../../components/nfts/generalDetails'
import Purchase from '../../components/nfts/purchase'

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
}

function NFT() {
  const { provider } = useWeb3()
  const [selectedNft, setSelectedNft] = useState<NFTMetadata | undefined>(
    undefined
  )
  const [listings, setListings] = useState<any[]>([])
  const router = useRouter()

  const nftModule = useMemo(() => {
    if (!provider) return

    const sdk = new ThirdwebSDK(provider.getSigner(), {
      readOnlyRpcUrl:
        'https://rinkeby.infura.io/v3/737e11f0574f4c28a92679ea10cf6c89',
    })
    return sdk.getNFTModule('0xAceEc50c9Eb9239DF1EAEA67Eb06F36977846a0a')
  }, [provider])

  // get all NFTs in the collection
  useEffect(() => {
    if (!nftModule) return
    ;(async () => {
      const nfts = await nftModule.getAll()

      const selectedNftItem = nfts.find((nft) => nft.id === router.query.id)

      setSelectedNft(selectedNftItem)
    })()
  }, [nftModule])

  const marketPlaceModule = useMemo(() => {
    if (!provider) return

    const sdk = new ThirdwebSDK(provider.getSigner(), {
      readOnlyRpcUrl:
        'https://rinkeby.infura.io/v3/737e11f0574f4c28a92679ea10cf6c89',
    })

    return sdk.getMarketplaceModule(
      '0x5f6fe4b3C4b85b97cB9127e436e4b3fDec33911f'
    )
  }, [provider])

  useEffect(() => {
    if (!marketPlaceModule) return
    ;(async () => {
      setListings(await marketPlaceModule.getAllListings())
    })()
  }, [marketPlaceModule])

  return (
    <div>
      <Header />
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.topContent}>
            <div className={style.nftImgContainer}>
              <NFTImage selectedNft={selectedNft} />
            </div>
            <div className={style.detailsContainer}>
              <GeneralDetails selectedNft={selectedNft} />
              <Purchase
                isListed={Boolean(router.query.isListed)}
                selectedNft={selectedNft!}
                listings={listings}
                marketPlaceModule={marketPlaceModule}
              />
            </div>
          </div>
          <ItemActivity />
        </div>
      </div>
    </div>
  )
}

export default NFT
