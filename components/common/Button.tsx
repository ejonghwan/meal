// type MouseEventHandler<T = Element> = EventHandler<MouseEvent<T>>;

// interface Props {
//   onClick: React.MouseEventHandler<HTMLButtonElement>;
// }

// 읽어볼거 https://velog.io/@eenaree/props-onClick-type




interface Props {
    content: string;
    attr: {
        type: "button";
        style: object;
        title?: string;
    }
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}


const Button = ({ attr, content, onClick }: Props) => {
    return (
        <button {...attr} onClick={onClick}>{content}</button>
    )
}


export default Button;