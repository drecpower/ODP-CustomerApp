export class IdentityProvider {
    /* Return id of identity (to be signed by orbit-db public key) */
    async getId (options:any) {}
  
    /* Return signature of OrbitDB public key signature */
    async signIdentity (data:any, options:any) {}
  
    /* Verify a signature of OrbitDB public key signature */
    static async verifyIdentity(identity:any):Promise<any> {}
  
    /* Return the type for this identity provider */
    static get type () {
      throw new Error('\'static get type ()\' needs to be defined in the inheriting class')
    }
  
    /*
      Return the type for this identity-procider
      NOTE! This is the only property of the interface that
      shouldn't be overridden in the inherited IdentityProvider
    */
    get type ():any {
      return (this.constructor as any).type
    }
  }
  