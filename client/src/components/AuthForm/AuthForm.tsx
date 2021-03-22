import React, { FormEvent, useCallback, useState } from "react";

type Props = {
   onSubmit: (email: string, password: string) => void;
   errors: string[];
}

export default function AuthForm({ onSubmit, errors }: Props): JSX.Element {
   const [state, setState] = useState({ email: "", password: "" });
   const handleSubmit = useCallback((event: FormEvent) => {
      event.preventDefault();
      onSubmit(state.email, state.password);
   }, [state, onSubmit]);

   return (
      <div className="row">
         <form
            className="col s4"
            onSubmit={handleSubmit}
         >
            <div className="input-field">
               <input
                  placeholder="Email"
                  value={state.email}
                  onChange={e => setState({ ...state, email: e.target.value })}
               />
            </div>
            <div className="input-field">
               <input
                  placeholder="Password"
                  type="password"
                  value={state.password}
                  onChange={e => setState({ ...state, password: e.target.value })}
               />
            </div>

            <div className="errors">
               {errors.map(error => <div key={error}>{error}</div>)}
            </div>

            <button className="btn">Submit</button>
         </form>
      </div>
   );
}