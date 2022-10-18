import { IdentityProvider } from "./identity-provider-interface"
import { ethers } from "ethers"
import { SignatureLike } from "@ethersproject/bytes";


export class EthIdentityProvider extends IdentityProvider {
    provider;
    wallet:any;
    
    static _type=<any>"ethereum";
    static _rpcProvider="https://polygon-rpc.com/";

  constructor (options:any = {}) {
    super()
    this.provider= new ethers.providers.JsonRpcProvider(EthIdentityProvider._rpcProvider);
  }

  // Returns the type of the identity provider
  static override get type () { return this._type }

  // Returns the signer's id
  override async getId (options = {}) {
    var ssW= (sessionStorage.getItem("wallet_getId"));
    if (ssW!=null){
        return ssW;
    } else {
        if (!this.wallet) {
            this.wallet = ((await this._createWallet(options)) as any )
          }
          let ret=await (this.wallet.getAddress() as any)
          sessionStorage.setItem("wallet_getId",ret);
          return ret
    }
  }

  // Returns a signature of pubkeysignature
  override async signIdentity (data: any, options = {}) {
    var ssSI=(sessionStorage.getItem("wallet_signedid"));
    if (ssSI!=null){
        return ssSI;
    } else {
        const wallet = this.wallet
        if (!wallet) { throw new Error('wallet is required') }
    
        let ret=await (wallet.signMessage(data) as any)
        sessionStorage.setItem("wallet_signedid",ret);
        return ret;
    }
  }

  static override async verifyIdentity(identity: { publicKey: any; signatures: { id: any; publicKey: SignatureLike; }; id: string; }) {
    // Verify that identity was signed by the id
    const provider = new ethers.providers.JsonRpcProvider(EthIdentityProvider._rpcProvider);
    const wallet = provider.getSigner();
    const verifyMessage=ethers.utils.verifyMessage;
    const signerAddress = verifyMessage(identity.publicKey + identity.signatures.id, identity.signatures.publicKey)
    return (signerAddress === identity.id)
  }

  async _createWallet (options:any = {}) {
    if (options.mnemonicOpts) {
      if (!options.mnemonicOpts.mnemonic) {
        throw new Error('mnemonic is required')
      }
      const Wallet = ethers.Wallet;
      return Wallet.fromMnemonic(options.mnemonicOpts.mnemonic, options.mnemonicOpts.path, options.mnemonicOpts.wordlist)
    }
    if (options.encryptedJsonOpts) {
      if (!options.encryptedJsonOpts.json) {
        throw new Error('encrypted json is required')
      }
      if (!options.encryptedJsonOpts.password) {
        throw new Error('password for encrypted json is required')
      }
      const Wallet = ethers.Wallet;
      return Wallet.fromEncryptedJson(options.encryptedJsonOpts.json, options.encryptedJsonOpts.password, options.encryptedJsonOpts.progressCallback)
    }
    const Wallet = ethers.Wallet;
    return Wallet.createRandom()
  }
}
