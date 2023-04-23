import { FC } from "react";


const ProgressBar: FC = (props) => {

    const progress = `${props.progress}%`

    return (<>
        <div className="bg-yellow-400 mt-1 mb-1 h-3 rounded-md w-60">
            <div className="bg-yellow-600
                rounded-md
                h-full"
                style={{width: progress}}>
            </div>
        </div>
    </>);
}

export default ProgressBar;