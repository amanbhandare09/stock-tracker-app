"use client";
import OverlapChart from "@/app/ui/overlap/overlapchart";
import { ComboboxPopover } from "@/app/ui/overlap/inputcbox";
import HorizontalBarGraph from "./ui/overlap/HorizontalBarGraph";
import Dashboard from "@/app/ui/overlap/Dashboard";

import { useState } from "react";
import {fetchOverlapData} from "@/lib/data";
import { defaultdata } from "@/lib/defaultvals";


type Scheme = {
    id: string;
    name: string;
};

export default function Page() {
  const [schemeA, setSchemeA] = useState<Scheme>({id: '', name: ''});
  const [schemeB, setSchemeB] = useState<Scheme>({id: '', name: ''});
  const [isLoading, setLoading] = useState<boolean>(false);
  const [overlapData, setOverlapData] = useState<any>(defaultdata); 
  
  const handleValueChangeA = (value: Scheme) => {
    setSchemeA(value);
  };
  
  const handleValueChangeB = (value:any) => {
    setSchemeB(value);
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if(schemeA.name== "" || schemeB.name== ""){
      alert("Please choose a MutualFund to Compare");
    }else{
      fetchOverlapData(schemeA, schemeB)
      .then((data) => {
        setOverlapData(data)})
        .catch((error) => console.error(error));
        setLoading(true);
    }
    
    };
    const names = [schemeA.name, schemeB.name];
 
 
    return (
    <div className="flex flex-col justify-center items-center my-10">
      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit}>
          <ComboboxPopover scheme="A" onValueChange={handleValueChangeA} />

          <ComboboxPopover scheme="B" onValueChange={handleValueChangeB} />
        
          <div className="flex justify-center">
          <button className="btn btn-primary my-4 justify-center" type="submit">Compare</button>
          </div>
        </form>
      </div>
      {isLoading && 
      <div>
          <div>
            <OverlapChart data = {overlapData.calculation} />
          </div>
          <div className="flex flex-col justify-between min-h-screen bg-base-300 text-white p-6">
              <div>
                  <Dashboard data = {overlapData.calculation}/>
              </div>
              <div>
                  <HorizontalBarGraph data={overlapData.data} name = {names} />
              </div>
          </div>
      </div>
      }
    </div>
  );
}
