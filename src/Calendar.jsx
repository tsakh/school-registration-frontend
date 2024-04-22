import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
export default function Calendar(props) {
    const options = props.options;

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Please, select your compatible option</FormLabel>
            <RadioGroup>
                {options.map((option, index) => (
                    <FormControlLabel
                        key={index}
                        value={option}
                        control={<Radio />}
                        label={option}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    )
}