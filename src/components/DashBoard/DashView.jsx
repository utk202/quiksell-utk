import React from "react";
import { useSelector } from "react-redux";
import { DiCodeigniter } from "react-icons/di";
import { AiOutlinePlus } from "react-icons/ai";
import "./DashView.css";
import Card from "../Card/Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faAdjust, faCircleHalf, faExclamationTriangle, faCircleNotch } from '@fortawesome/free-solid-svg-icons';


const getPriorityIcon = (priority) => {
  switch (priority) {
    case 'No priority':
      return <FontAwesomeIcon icon={faCircle} />;
    case 'Low':
      return <FontAwesomeIcon icon={faAdjust} />;
    case 'Medium':
      return <FontAwesomeIcon icon={faAdjust} />;
    case 'High':
      return <FontAwesomeIcon icon={faAdjust} />;
    case 'Urgent':
      return <FontAwesomeIcon icon={faExclamationTriangle} />;
    default:
      return null;
  }
};

const DashView = () => {
  const { selectedData, user } = useSelector(
    (state) => state.SelectDataReducer
  );

  return (
    selectedData && (
      <div className="utkdashContainer">
        {selectedData.map((elem, index) => {
          return (
            <>
              <div key={index} className="dashCardContainer">
                <div className="dashCardHeading flex-sb">
                  <div className="leftView">
                    {!user ? (
                      getPriorityIcon(elem[index]?.title)
                    ) : (
                      <>
                        <div
                          className="imageContainer relative"
                          style={{ width: "15px", height: "15px", display : 'inline-block' }}
                        >
                          <img
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "50%",
                            }}
                            src="data:image/jpeg;base64,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"
                            alt="UserImage"
                          />
                        </div>
                      </>
                    )}
                    <span>
                      {" "}
                      {elem[index]?.title} {elem[index]?.value?.length}
                    </span>
                  </div>
                  <div className="rightView">
                    <AiOutlinePlus />{" "}
                    <span style={{ letterSpacing: "2px" }}>...</span>
                  </div>
                </div>
                <div className="dashList flex-gap-10">
                  {elem[index]?.value?.map((elem, ind) => {
                    return (
                      <Card id={elem.id} title={elem.title} tag={elem.tag} />
                    );
                  })}
                </div>
              </div>
            </>
          );
        })}
      </div>
    )
  );
};

export default DashView;
