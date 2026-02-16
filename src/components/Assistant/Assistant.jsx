import { useEffect, useState } from "react";
import styles from "./Assistant.module.css";
import { Assistant as GoogleAIAssistant } from "../../assistants/googleai";
/* import { Assistant as OpenAIAssistant } from "../../assistants/openai";
import { Assistant as DeepSeekAIAssistant } from "../../assistants/deepseekai";
import { Assistant as AnthropicAIAssistant } from "../../assistants/anthropicai";
import { Assistant as XAIAssistant } from "../../assistants/xai"; */

const assistantMap = {
    googleai: GoogleAIAssistant,
    /* openai: OpenAIAssistant,
    deepseekai: DeepSeekAIAssistant,
    anthropicai: AnthropicAIAssistant,
    xai: XAIAssistant */
};

export function Assistant({ onAssistantChange }) {
    const [value, setValue] = useState("googleai:gemini-3-flash-preview");

    function handleValueChange(event) {
        setValue(event.target.value);
    }

    useEffect(() => {
        const [assistant, model] = value.split(":");
        const AssistantClass = assistantMap[assistant];
        if (!AssistantClass) {
            throw new Error(`Unkwon assistant: ${assistant} or model: ${model}`);
        }
        onAssistantChange(new AssistantClass(model));
    }, [value]);

    return (
        <div className={styles.Assistant}>
            <span> Assistant: </span>
            <select defaultValue={value} onChange={handleValueChange}>
                <optgroup label="Google AI">
                    <option value="googleai:gemini-3-flash-preview"> Gemini 3 Flash Preview </option>
                    <option value="googleai:gemini-2.5-flash"> Gemini 2.5 Flash </option>
                </optgroup>
                {/* <option value="openai"> Open AI</option>
                <option value="deepseekai"> Deepseek AI</option>
                <option value="anthropicai"> Anthropic AI</option>
                <option value="xai"> X AI</option> */}
            </select>
        </div>
    );
}