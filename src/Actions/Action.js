import axios from 'axios';
import * as actionTypes from './Constant';


export const fetchAllData = () => async (dispatch) =>{
    try {
        dispatch({type : actionTypes.DATA_REQUEST})
    
        const {data} = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment/");

        dispatch({type : actionTypes.DATA_SUCCESS, payload : data});

    } catch (error) {
        dispatch({type : actionTypes.DATA_FAILURE})
    }
}

export const selectData = (group, allTickets, orderValue) => async (dispatch) =>{
    try {
        dispatch({type : actionTypes.SELECT_DATA_REQUEST})

        let user = false;
        let utkmySet = new Set();
        let utkarr = [], selectedData = [];

        if(group === 'status'){
            allTickets.forEach((elem) => {
                utkmySet.add(elem.status);
            })
    
            utkarr = [...utkmySet];
    
            utkarr.forEach((elem, index) => {
                let utkarr = allTickets.filter((fElem) => {
                    return elem === fElem.status;
                })
                selectedData.push({
                    [index] : {
                        title : elem,
                        value : utkarr
                    }
                })
            })
        }else if(group === 'user'){
            user = true;
            allTickets?.allUser?.forEach((elem, index) => {
                utkarr = allTickets?.allTickets?.filter((Felem) => {
                    return elem.id === Felem.userId;
                })

                selectedData.push({
                    [index] : {
                        title : elem.name,
                        value : utkarr
                    }
                })
            })
        }else{
            let prior_list = ["No priority", "Low", "Medium", "High", "Urgent"];

            prior_list.forEach((elem, index) => {
                utkarr = allTickets.filter((fElem) => {
                    return index === fElem.priority;
                })

                selectedData.push({
                    [index] : {
                        title : elem,
                        value : utkarr
                    }
                })
            })
        }

        if(orderValue === "title"){
            selectedData.forEach((elem, index) => {
                elem[index]?.value?.sort((a, b) => a.title.localeCompare(b.title))
            })
        }

        if(orderValue === "priority"){
            selectedData.forEach((elem, index) => {
                elem[index]?.value?.sort((a, b) => b.priority - a.priority)
            })
        }
        
        dispatch({type : actionTypes.SELECT_DATA_SUCCESS, payload : {selectedData, user}});

    } catch (error) {
        dispatch({type : actionTypes.SELECT_DATA_FAILURE, payload : error.message})
    }
}
