import StackIcon from "tech-stack-icons";
import { Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ref, child, get } from "firebase/database";
import { db } from "../firebase";
import Loading from "./common/Loading";

function TechStackList({ techStackOpen }) {
  const dbRef = ref(db);

  interface TechData {
    list: [{ exIcon: number; name: string; type: string }];
    typeList: string[];
  }

  const [techData, setTechData] = useState<TechData>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    get(child(dbRef, `techData`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setTechData(snapshot.val());
          setIsLoading(false);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  if (isLoading) {
    return <Loading height="" />;
  }
  return (
    techData &&
    techData.typeList.map((type, idx) => (
      <dl key={`type-${idx}`}>
        <dt>{techStackOpen ? type : ""}</dt>
        {techData.list
          .filter((li) => li.type == type)
          .map((el, idx2) => (
            <>
              <dd key={idx2}>
                <span
                  className="tech-name"
                  data-name={el.name}
                  data-tooltip-id="tech-tooltip"
                  data-tooltip-content={el.name}
                >
                  {el.exIcon === 1 ? (
                    <div className="tsi">
                      <Image src={`/assets/icons/${el.name}.png`} />
                    </div>
                  ) : (
                    <StackIcon name={el.name} />
                  )}
                </span>
              </dd>
            </>
          ))}
      </dl>
    ))
  );
}

export default TechStackList;
