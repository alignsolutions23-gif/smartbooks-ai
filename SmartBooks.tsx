 "use client";

import {useState} from "react";
import {
  LayoutDashboard, ReceiptIndianRupee, ShoppingCart, UsersRound, Package,
  BarChart3, Bot, Menu, Bell, Plus, ChevronRight, X, Building2,
  FileText, WalletCards, Settings, Search, ArrowUpRight, ArrowDownRight,
  MoreHorizontal, LogOut
} from "lucide-react";

type Tab="Home"|"Sales"|"Purchases"|"Parties"|"More";

const money=(n:number)=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(n);

export default function SmartBooks(){
  const [tab,setTab]=useState<Tab>("Home");
  const [menu,setMenu]=useState(false);
  const [invoice,setInvoice]=useState(false);
  const [company,setCompany]=useState("Mandhata & Associates");
  const [showCompany,setShowCompany]=useState(false);

  const nav=[
    {id:"Home" as Tab,label:"Home",icon:LayoutDashboard},
    {id:"Sales" as Tab,label:"Sales",icon:ReceiptIndianRupee},
    {id:"Purchases" as Tab,label:"Purchase",icon:ShoppingCart},
    {id:"Parties" as Tab,label:"Parties",icon:UsersRound},
    {id:"More" as Tab,label:"More",icon:Menu},
  ];

  return <main className="app">
    <header className="topbar">
      <button className="iconBtn" onClick={()=>setMenu(true)}><Menu size={22}/></button>
      <div className="brand">
        <div className="brandMark">SB</div>
        <div><b>SmartBooks</b><span>AI Accounting</span></div>
      </div>
      <button className="iconBtn"><Bell size={21}/><i/></button>
    </header>

    <section className="content">
      {tab==="Home" && <Home company={company} onCompany={()=>setShowCompany(true)} onInvoice={()=>setInvoice(true)}/>}
      {tab==="Sales" && <ListPage title="Sales" icon={<ReceiptIndianRupee/>} button="New Invoice" onAdd={()=>setInvoice(true)}
        items={[["INV-0012","Ravi Traders","₹1,18,000","Paid"],["INV-0011","Sri Lakshmi Stores","₹59,000","Pending"],["INV-0010","ABC Enterprises","₹35,400","Paid"]]}/>}
      {tab==="Purchases" && <ListPage title="Purchases" icon={<ShoppingCart/>} button="New Purchase" onAdd={()=>{}}
        items={[["PUR-0041","Sree Suppliers","₹82,600","Paid"],["PUR-0040","Vijaya Agencies","₹41,300","Pending"],["PUR-0039","Kiran Traders","₹26,550","Paid"]]}/>}
      {tab==="Parties" && <ListPage title="Parties" icon={<UsersRound/>} button="Add Party" onAdd={()=>{}}
        items={[["Ravi Traders","Customer","₹2,45,000"],["Sree Suppliers","Supplier","₹82,600"],["Sri Lakshmi Stores","Customer","₹59,000"]]}/>}
      {tab==="More" && <MorePage onCompany={()=>setShowCompany(true)}/>}
    </section>

    <button className="fab" onClick={()=>setInvoice(true)}><Plus size={26}/><span>Invoice</span></button>

    <nav className="bottomNav">{nav.map(n=>{const I=n.icon;return <button key={n.id} className={tab===n.id?"active":""} onClick={()=>setTab(n.id)}><I size={21}/><span>{n.label}</span></button>})}</nav>

    {menu && <Drawer close={()=>setMenu(false)} company={company} onCompany={()=>{setMenu(false);setShowCompany(true)}}/>}
    {invoice && <InvoiceModal close={()=>setInvoice(false)}/>}
    {showCompany && <CompanyModal company={company} setCompany={setCompany} close={()=>setShowCompany(false)}/>}
  </main>
}

function Home({company,onCompany,onInvoice}:{company:string,onCompany:()=>void,onInvoice:()=>void}){
 return <div className="stack">
   <div className="welcome"><div><small>Good morning</small><h1>Business Overview</h1><button onClick={onCompany}><Building2 size={14}/>{company}<ChevronRight size={15}/></button></div><div className="avatar">PR</div></div>
   <div className="fy">FY 2026–27 <span>•</span> GST Registered</div>
   <div className="stats">
     <Stat title="Sales" value="₹4.82L" delta="+12.4%" up/>
     <Stat title="Receivables" value="₹2.14L" delta="8 invoices"/>
     <Stat title="Purchases" value="₹2.31L" delta="+5.2%" up/>
     <Stat title="Payables" value="₹96K" delta="5 bills"/>
   </div>
   <div className="sectionHead"><h2>Quick Actions</h2></div>
   <div className="quick">
     <Quick icon={<ReceiptIndianRupee/>} text="Sales Invoice" onClick={onInvoice}/>
     <Quick icon={<ShoppingCart/>} text="Purchase" onClick={()=>{}}/>
     <Quick icon={<UsersRound/>} text="Add Party" onClick={()=>{}}/>
     <Quick icon={<Package/>} text="Product" onClick={()=>{}}/>
   </div>
   <div className="card">
     <div className="sectionHead"><h2>Recent Transactions</h2><button>View all <ChevronRight size={16}/></button></div>
     <Transaction name="Ravi Traders" code="INV-0012 • Today" amount="₹1,18,000" status="Paid" up/>
     <Transaction name="Sree Suppliers" code="PUR-0041 • Yesterday" amount="₹82,600" status="Paid"/>
     <Transaction name="Sri Lakshmi Stores" code="INV-0011 • Yesterday" amount="₹59,000" status="Pending" up/>
   </div>
   <div className="aiCard"><div className="aiIcon"><Bot/></div><div><b>AI Accountant</b><p>Ask about your books, GST, invoices or cash flow.</p></div><button>Ask AI <ChevronRight size={17}/></button></div>
 </div>
}

function Stat({title,value,delta,up}:{title:string,value:string,delta:string,up?:boolean}){return <div className="stat"><span>{title}</span><strong>{value}</strong><small className={up?"green":""}>{up&&<ArrowUpRight size={12}/>} {delta}</small></div>}
function Quick({icon,text,onClick}:{icon:React.ReactNode,text:string,onClick:()=>void}){return <button className="quickBtn" onClick={onClick}><span>{icon}</span><b>{text}</b></button>}
function Transaction({name,code,amount,status,up}:{name:string,code:string,amount:string,status:string,up?:boolean}){return <div className="txn"><div className="txnIcon">{up?<ArrowUpRight/>:<ArrowDownRight/>}</div><div className="txnText"><b>{name}</b><small>{code}</small></div><div className="txnAmt"><b>{amount}</b><small className={status==="Paid"?"paid":"pending"}>{status}</small></div></div>}

function ListPage({title,icon,button,onAdd,items}:{title:string,icon:React.ReactNode,button:string,onAdd:()=>void,items:string[][]}){
 return <div className="stack"><div className="pageTitle"><div><small>{icon}{title}</small><h1>{title}</h1></div><button className="primary" onClick={onAdd}><Plus size={17}/>{button}</button></div><div className="search"><Search size={18}/><input placeholder={`Search ${title.toLowerCase()}...`}/></div><div className="card listCard">{items.map((x,i)=><div className="listRow" key={i}><div className="listAvatar">{x[0].slice(0,2).toUpperCase()}</div><div className="txnText"><b>{x[0]}</b><small>{x[1]}</small></div><div className="txnAmt"><b>{x[2]}</b>{x[3]&&<small className={x[3]==="Paid"?"paid":"pending"}>{x[3]}</small>}</div><MoreHorizontal size={18}/></div>)}</div></div>
}
function MorePage({onCompany}:{onCompany:()=>void}){const rows=[[<Package/>,"Inventory"],[<BarChart3/>,"Reports"],[<Bot/>,"AI Accountant"],[<FileText/>,"GST Reports"],[<Building2/>,"Company Setup"],[<Settings/>,"Settings"]];return <div className="stack"><div className="pageTitle"><div><small>More</small><h1>All Modules</h1></div></div><div className="moduleCard">{rows.map((r,i)=><button key={i} onClick={r[1]==="Company Setup"?onCompany:undefined}><span>{r[0]}</span><b>{r[1] as string}</b><ChevronRight/></button>)}</div></div>}
function Drawer({close,company,onCompany}:{close:()=>void,company:string,onCompany:()=>void}){return <div className="overlay" onClick={close}><aside className="drawer" onClick={e=>e.stopPropagation()}><div className="drawerHead"><div className="brand"><div className="brandMark">SB</div><div><b>SmartBooks</b><span>AI Accounting</span></div></div><button className="iconBtn" onClick={close}><X/></button></div><div className="companyBox"><Building2/><div><b>{company}</b><small>FY 2026–27</small></div><ChevronRight/></div>{["Dashboard","Accounting","Sales","Purchases","Parties","Inventory","GST Reports","Reports","AI Accountant"].map((x,i)=><button className="drawerRow" key={x}><span>{[<LayoutDashboard/>,<WalletCards/>,<ReceiptIndianRupee/>,<ShoppingCart/>,<UsersRound/>,<Package/>,<FileText/>,<BarChart3/>,<Bot/>][i]}</span>{x}<ChevronRight/></button>)}<button className="drawerRow" onClick={onCompany}><Settings/>Company Setup<ChevronRight/></button><button className="logout"><LogOut/>Sign out</button></aside></div>}
function InvoiceModal({close}:{close:()=>void}){return <div className="sheetOverlay"><div className="sheet"><div className="sheetHead"><div><small>New Transaction</small><h2>Sales Invoice</h2></div><button onClick={close}><X/></button></div><label>Customer / Party<input placeholder="Select customer"/></label><div className="two"><label>Invoice No.<input value="INV-0013" readOnly/></label><label>Date<input value="24-09-2026" readOnly/></label></div><label>Item / Service<input placeholder="Select product or service"/></label><div className="two"><label>HSN / SAC<input placeholder="e.g. 9983"/></label><label>GST Rate<select defaultValue="18"><option>5%</option><option>12%</option><option>18%</option><option>28%</option></select></label></div><div className="amountBox"><span>Taxable Amount</span><b>₹1,00,000</b><span>CGST + SGST</span><b>₹18,000</b><hr/><span>Total Invoice Value</span><strong>₹1,18,000</strong></div><button className="saveBtn" onClick={close}>Save Invoice</button></div></div>}
function CompanyModal({company,setCompany,close}:{company:string,setCompany:(x:string)=>void,close:()=>void}){const [v,setV]=useState(company);return <div className="sheetOverlay"><div className="sheet"><div className="sheetHead"><div><small>Business Settings</small><h2>Company Setup</h2></div><button onClick={close}><X/></button></div><label>Company Name<input value={v} onChange={e=>setV(e.target.value)}/></label><label>GSTIN<input placeholder="37ABCDE1234F1Z5"/></label><label>Business Address<textarea placeholder="Enter address"/></label><div className="two"><label>State<input value="Andhra Pradesh" readOnly/></label><label>Financial Year<input value="2026–27" readOnly/></label></div><button className="saveBtn" onClick={()=>{setCompany(v);close()}}>Save Company</button></div></div>}
