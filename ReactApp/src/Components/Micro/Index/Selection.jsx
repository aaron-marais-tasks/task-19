import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import * as Index from "../../Styled/Index"

export default props => {
	const [selected, setSelected] = React.useState(false)

	const selectItem = () => {
		if(selected)
			props.remove()
		else
			props.add()

		setSelected(!selected)
	}

	return (
		<Index.Selection onClick={selectItem}>
			<FontAwesomeIcon className="select"
				icon={[
					"far", selected ? "check-square" : "square"
				]}
			/>
			
			<div className="text">{props.title}</div>
		</Index.Selection>
	)
}
