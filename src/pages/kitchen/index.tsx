import RecipeList from "../../components/recipe/RecipeList"
import colors from "../../../styles"
import MiniHeader from "../../components/common/MiniHeader"
import Header from "../../components/common/Header"

export default function Recipe(){
    return(
        <div className="box">
        <Header text="주방"/>
        <MiniHeader left="추천 식사" right="Our Pick!" leftURL="/kitchen" rightURL="/kitchen/ourpick" button="필터" buttonURL="/kitchen/filter"/>
        <div className="container">
            나에게 딱 맞는 레시피! <br/>
            <div className="margin">
                <RecipeList type="right"/>
            </div>
        </div>
        <div className="bar" />
        <div className="container">
            오늘 이 레시피는 어때요?
            <RecipeList type="bottom"/>
        </div>
        <style jsx>{`
            .box {
                width: 390px
            }
            .container {
                margin-left: 20px;
                width: 390px
                background: black;
            }
            .bar {
                background: ${colors.grayBackgroundSub};
                height: 8px;
                width: 390px;

                margin-bottom: 18px;
            }
            .margin {
                margin-right: 20px
            }
        `}</style>
        </div>
    )
}