import React from "react";
import  { TeamsView, FiltersListItemType } from "@twilio/flex-ui";


// Define an Input component; returns a simple input HTML element with logic to handle changes when users enter input
const Input = ({ handleChange, currentValue = "", fieldName }) => {
   const _handleChange = (e) => {
       e.preventDefault();
       handleChange(e.target.value);
   };

   return (
       <input
           className="CustomInput"
           type="text"
           onChange={_handleChange}
           value={currentValue}
           name={fieldName}
       />
   )
};

// Define the label that supervisors will see when using our custom filter
const CustomLabel = ({ currentValue }) => (
  <>{currentValue && currentValue.length ? `Containing "${currentValue}"` : "Any"}</>
);


// Define a new filter that uses the custom field
const nameFilter = {
   id: "data.attributes.full_name",
   fieldName: "full_name",
   title: "Names",
   customStructure: {
       field: <Input />,
       label: <CustomLabel />,
   },
   condition: "CONTAINS"
};

const optionsData = [
    {
       value: "US",
       label: "US",
       default: false
    },
    {
       value: "NL",
       label: "NL",
       default: true
    }
]

const optionsFilter = {
    id: "data.attributes.routing.skills",
    fieldName: "options",
    title: "Options",
    options: optionsData,
    type: "multiValue", //FiltersListItemType.multiValue,
 };




// Add the filter to the list of filters in the TeamFiltersPanel
// export const extendFilter = () => {
//    Flex.TeamsView.defaultProps.filters = [
//        Flex.TeamsView.activitiesFilter,
//        nameFilter,
//        optionsFilter
//    ];
// };

// Export a function to be invoked in plugin's main entry-point
export const extendFilter = (manager) => {
  manager.updateConfig({
      componentProps: {
          TeamsView: {
              filters:[
                  TeamsView.activitiesFilter,
                  nameFilter,
                  optionsFilter
              ]
          }
      }
  })
};

