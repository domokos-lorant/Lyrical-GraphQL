import React, { useCallback } from "react";
import { Link } from "react-router";
import { useCurrentUserQuery } from "./__generated__/currentUser.query.generated";
import { useLogoutMutation } from "./__generated__/logout.mutation.generated";

export default function Header(): JSX.Element {
   const { loading, error: _error, data, refetch } = useCurrentUserQuery();
   const [logout] = useLogoutMutation();
   const user = data?.user;
   const onLogout = useCallback(async () => {
      await logout();
      await refetch();
   }, [user]);

   const renderButtons = useCallback(() => {
      return (
         <>
            {
               loading ? <div />
                  : user
                     ?
                     <li><a onClick={onLogout}>Logout</a></li>
                     :
                     <div>
                        <li>
                           <Link to="/signup">Signup</Link>
                        </li>
                        <li>
                           <Link to="/login">Login</Link>
                        </li>
                     </div>
            }
         </>
      );
   }, [loading, user]);

   return (
      <nav>
         <div className="nav-wrapper">
            <Link to="/" className="brand-logo left">Home</Link>
            <ul className="right">
               {renderButtons()}
            </ul>
         </div>
      </nav>
   );
}
