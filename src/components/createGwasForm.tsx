import { type FC, useState } from "react";
import { api } from "~/utils/api";
import Image from "next/image";


const CreateGWASForm: FC = () => {

    const imageDimensions = 100

    const [username, setUsername] = useState('')
    const [error, setError] = useState('')

    const ctx = api.useContext()

    const createGwasMutation = api.gwas.createGwas.useMutation({
        onSuccess: () => {
            void ctx.gwas.getGwas.invalidate()
        },
        onError: (error) => {
            setError(error.message)
        }
    })

    const createGwas = () => {
        createGwasMutation.mutate({ username })
    }

    return (<>
        <h2 className="text-3xl mb-4">
            GWASod született!
        </h2>
        
        <Image
        alt="GWAS"
        src="/gwas.png"
        width={imageDimensions}
        height={imageDimensions}
        className="mt-4 mb-4"
        />

        <label htmlFor="message-input" className="text-sm">Mi legyen a neve (Max 12 karakter)?</label> <br />
        <input id="message-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)}
            className="border border-black p-3 rounded md:w-full"
            maxLength={12}
        />
        {error.length > 0? (<>
        <div className="text-red-500 font-bold" onClick={() => {setError('')}}>
            {error}
        </div>
        </>):""}

        <div>
            <button
            onClick={createGwas}
            className="bg-lime-500 py-2 px-4 text-lg mt-3 font-bold text-left
            hover:bg-lime-800
            hover:text-slate-100

            disabled:bg-gray-400
            disabled:text-gray-800
            "
            disabled={username.length < 3}
            >
            {username.length < 3 ? "Mehet!" : `Éljen ${username}, az új GWAS!`}
            </button>
        </div>
    </>);
}

export default CreateGWASForm;