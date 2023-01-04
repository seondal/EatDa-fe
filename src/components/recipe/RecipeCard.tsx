import { useRouter } from "next/router";
import colors from "../../../styles"

interface RecipeCardType{
    type: string;
}

export default function RecipeCard({type}:RecipeCardType){
    const router = useRouter();
    const marginBottom = (type === "bottom" && router.pathname === '/recipe/ourpick') ? '45px' : '9px';
    const display = (type === "bottom" && router.pathname === '/recipe/ourpick') ? 'visible' : 'none';
    return(
        <>
            <div className="container">
                <div className="itemImg">
                    <div className='buttonImg'>
                        <img src='/img/heart_full.svg' alt="heart"/>
                    </div>
                </div>
                <div className="itemText">
                    text
                </div>
                <div className="like">
                    좋아요
                </div>
            </div>
            <style jsx>{`
                .container {
                    // margin-left: 5px;
                    margin-right: 10px;
                    margin-bottom: ${marginBottom};
                    background: ${colors.grayWhite};
                    height: 196px;
                    width: 170px;
                    border-radius: 4px;
                }

                .itemImg {
                    height: 131px;
                    width: 170px;

                    display: flex;
                    flex-direction: row-reverse;
                }
                .itemText {
                    height: 65px;
                    width: 170px
                }

                .buttonImg {
                    margin-right: 12px;
                    margin-top: 10px; 
                }

                .like {
                    display: ${display};
                    width: 107px;
                    height: 30px;
                    border-radius: 15px;
                    margin-top: 6px;
                    background: ${colors.grayWhite};
                    float: right;
                    color: ${colors.graySubTitle};
                }
            `}</style>
        </>
    )
}