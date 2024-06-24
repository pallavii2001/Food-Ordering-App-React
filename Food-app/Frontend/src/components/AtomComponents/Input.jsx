export default function Input({label,id,type}){
   return <p className="control">
    <label>{label}</label>
    <input id={id} name={id} type={type} required/>
   </p>
}