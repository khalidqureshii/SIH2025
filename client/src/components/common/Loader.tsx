// import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// function Loader() {
//     const serverMessage = "Almost There... Just a Moment!";
//     return <div className="w-full h-80vh flex flex-col justify-center items-center">
//         <div className="flex flex-col justify-center items-center">
//             <DotLottieReact
//                 src="https://lottie.host/62a4c118-52f9-4dd3-8052-1b27216448e6/nTh20QwCcE.lottie"
//                 // Clock
//                 // src="https://lottie.host/08b99ebc-82d2-437d-9a1c-3143b14aabe2/6gGInrVoj9.json" 
//                 // Timer
//                 // src="https://lottie.host/d6090d99-4991-4c1c-977b-cd4e0c5b70b8/tqdxrb4DFm.lottie"
//                 // Bear
//                 // src="https://lottie.host/bddfdad6-93f7-48ab-b9e8-cc6411bcb982/Mo3yS0sWe1.lottie"
//                 // Hamster
//                 loop
//                 style={{width:500, height: 500}}
//                 autoplay
//                 speed={1.1}
//             />
//             <h2 className="text-3xl font-bold">{serverMessage}</h2>
//         </div>
//     </div>;
// }

// export default Loader;


import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface LoaderProp{
    src: string;
    message: string;
    className?: string;
    animationClassName?: string;
}

const Loader: React.FC<LoaderProp> = (props) => {
    const {src, message, className, animationClassName} = props;

    return (
        <>
            <div className={`flex flex-col justify-center items-center w-full h-[50vh] ${className}`}>
                <div className="flex flex-col justify-center items-center">
                    <div className={`w-64 md:w-80 ${animationClassName}`}>
                            <DotLottieReact
                                // Rain
                                // src='https://lottie.host/f2784c2b-d89d-4b1d-9176-2c3c43a1f57e/eI03PSK8Bi.lottie'
                                // Wind
                                // src='https://lottie.host/59bd733b-8f3d-490e-a778-6f91b97d5ffb/2t8ay63ll6.lottie'
                                // Sun
                                // src='https://lottie.host/2e87f684-6d24-4ea6-944a-a1eafe942056/bRhcBCiAo6.lottie'
                                // Snow
                                // src='https://lottie.host/01848d62-d139-4d8a-9604-2c12b27a4812/86nGzKRHDL.lottie'
                                // World
                                // src='https://lottie.host/28849d46-6262-42ec-be27-deea2d9ae9a0/ZgKbMCHk1g.lottie'
                                src={src}
                                loop
                                autoplay
                                speed={1.1}
                                />
                        </div>
                    <h2 className="text-md md:text-2xl font-bold text-cyan-900">{message}</h2>
                </div>
            </div>
        </>
    );
}

export default Loader;