import Navigation from "../../../components/common/Navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import colors from "../../../../styles";
import ProcessCard from "../../../components/kitchen/ProcessCard";
import { GetServerSideProps } from "next";
import { RecipeDataType } from "../../../interface/recipe";
import { useSelector } from "react-redux";
import { selectToken } from "../../../store/tokenSlice";
import { useRouter } from "next/router";
import { Post } from "../../../hooks/Fetch";
import FooterButton from "../../../components/common/FooterButton";
import Image from "next/image";

const image = {
  complete_meal: "/process/complete_meal.svg",
  when_eat: "/process/when_eat.svg",
  breakfast_black: "/process/breakfast_black.svg",
  breakfast_white: "/process/breakfast_white.svg",
  lunch_white: "/process/lunch_white.svg",
  lunch_black: "/process/lunch_black.svg",
  dinner_white: "/process/dinner_white.svg",
  dinner_black: "/process/dinner_black.svg",
};

const mealButtonData = [
  {
    timelinine: 0,
    icon: image.breakfast_black,
    selected: image.breakfast_white,
    text: "아침",
  },
  {
    timelinine: 1,
    icon: image.lunch_black,
    selected: image.lunch_white,
    text: "점심",
  },
  {
    timelinine: 2,
    icon: image.dinner_black,
    selected: image.dinner_white,
    text: "저녁",
  },
];

interface ProcessProps {
  recipeData: RecipeDataType;
}

export default function Process({ recipeData }: ProcessProps) {
  const { query } = useRouter();
  const token = useSelector(selectToken);
  const router = useRouter();

  const [when, setWhen] = useState(0);

  async function handleSubmit() {
    const requestBody = {
      diet_id: query.recipeId,
      timeline: when,
    };
    const { data, res }: any = await Post({
      url: "users/diet/",
      token: token.access_token,
      requestBody: requestBody,
    });
    if (typeof data == "undefined") {
      router.back();
    } else if (data.status == 403) {
      alert("이미 해당 시간대에 등록된 식단이 있습니다.");
    }
  }

  // 레시피 과정 데이터에서 재료에 해당하는 단어 뽑아서 카드 데이터 넣기
  recipeData.recipe.forEach((menu) => {
    menu.process.forEach((level) => {
      // 재료 단어들로 정규식 만들기
      let regex_str = "";
      level.ingredients.forEach((ingredient) => {
        regex_str = regex_str + ingredient + "|";
      });
      regex_str = regex_str.slice(0, -1);
      const regex = new RegExp(regex_str);
      level.splitted = level.step.split(regex);
    });
  });

  return (
    <>
      <Navigation text="상세정보" />
      <div className="container">
        {recipeData.recipe.map((menu, idx) => (
          <div key={idx} className="process-list">
            <div className={idx == 0 ? "title main" : "title sub"}>
              {menu.title}
            </div>
            {menu.process.map((step, idx) => (
              <ProcessCard
                key={idx}
                num={idx + 1}
                content={step}
                selected={false}
              />
            ))}
          </div>
        ))}
        <div className="finish-box">
          <div className="image-box">
            <Image
              src={image.complete_meal}
              width="233"
              height="131"
              alt="조리완료"
            />
          </div>
          <div className="select-meal">
            <Image src={image.when_eat} width={16} height={16} alt={""} />
            언제 식사 하시나요?
            <div className="meal-list">
              {mealButtonData.map((meal) => (
                <div
                  onClick={() => setWhen(meal.timelinine)}
                  key={meal.timelinine}
                  className={
                    meal.timelinine == when
                      ? "meal-button clicked"
                      : "meal-button"
                  }
                >
                  <Image
                    src={meal.timelinine == when ? meal.selected : meal.icon}
                    alt=""
                    width={16}
                    height={16}
                  />
                  {meal.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <FooterButton onClick={handleSubmit} text={"요리 완료하기"} />
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .title {
          display: flex;
          align-items: center;
          height: 56px;
          border-radius: 4px;
          font-size: 24px;
          font-weight: 700;
          padding: 0px 12px;
          margin-bottom: 12px;
        }
        .main {
          color: ${colors.grayWhite};
          background-color: ${colors.mainOrange};
        }
        .sub {
          background-color: ${colors.mainYellow};
        }

        .finish-box {
          border: 1px solid ${colors.blackSub};
          border-radius: 4px;
          padding: 6px;
        }
        .image-box {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px 0px 50px 0px;
        }
        .select-meal {
          border-radius: 6px;
          padding: 10px;
          background-color: ${colors.grayBackground};
        }
        .meal-list {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }
        .meal-button {
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid ${colors.blackSub};
          background-color: ${colors.grayWhite};
          border-radius: 21px;
          min-width: 100px;
          height: 42px;
          gap: 5px;
        }
        .clicked {
          background-color: ${colors.mainOrange};
          color: ${colors.grayWhite};
        }
      `}</style>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const recipeData = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_API_ROOT}diets/${context.params?.recipeId}`
    )
  ).json();
  return {
    props: {
      recipeData,
    },
  };
};
