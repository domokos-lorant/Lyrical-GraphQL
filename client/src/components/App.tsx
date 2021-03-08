import React from "react";

export default function App({ children }: { children: JSX.Element }): JSX.Element {
   return (
      <div className="container">
         {children}
      </div>
   );
}