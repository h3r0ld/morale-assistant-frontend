import { GrantedAuthority } from '../client/admin/model/grantedAuthority';
import { UserDetails } from '../client/admin/model/userDetails';

export class User implements UserDetails {
    enabled?: boolean;
    accountNonExpired?: boolean;
    accountNonLocked?: boolean;
    credentialsNonExpired?: boolean;
    username?: string;
    password?: string;
    authorities?: Array<GrantedAuthority>;

    authdata?: string;
}
