import { produce } from "immer";

function reducer(state, action) {
  return produce(state, (draftState) => {
    switch (action.type) {
      case "add-item": {
        const itemIndex = state.findIndex((item) => item.id === action.item.id);

        if (itemIndex !== -1) {
          draftState[itemIndex].quantity += 1;
          return;
        }

        draftState.push({
          ...action.item,
          quantity: 1,
        });
        console.log(action);
        return;
      }

      case "delete-item": {
        const itemIndex = state.findIndex((item) => item.id === action.item.id);

        draftState.splice(itemIndex, 1);
        window.localStorage.setItem("items", JSON.stringify(draftState));
        return;
      }

      case "onload": {
        return action.items;
      }
    }
  });
}

export default reducer;
