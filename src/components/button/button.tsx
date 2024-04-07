interface ButtonProps {
  text: string;
  onClick?: () => void;
}


export default function Button({ text, onClick }: ButtonProps) {
    return (
        <button onClick={onClick} className="py-2 px-10 rounded-md bg-gray-600 text-white text-sm">{text}</button>
    )
}