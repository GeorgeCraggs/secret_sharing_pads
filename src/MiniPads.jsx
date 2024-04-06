import {h} from "preact";

import "./MiniPads.less";

import {
	printerIcon,
} from "./images.js";

/**
 * A complete set of secret sharing pads, ready for printing.
 *
 * Props:
 * * padId: The unique ID identifying the set of secret sharing pads.
 * * description: Any introductory notes from the pad author to display.
 * * allEncryptedSecrets: An array of {letter, [{name, description,
 *   encryptedSecret: [{letter,  code: [n, ...]}, ...]}, ...]} objects.  For
 *   each lettered pad, gives the secret to be displayed gives the name and
 *   description string and encrypted secrets. Each encrypted secret is given
 *   as an array of encoded values and their associated letters.
 */
export default function MiniPads({
	padId,
	description,
	allEncryptedSecrets,
}) {
	return <div className="SecretSharingPads">
		<div className="print-button">
			<PrintHint />
		</div>
		<div className="pads">{
			allEncryptedSecrets.map(
				({letter, encryptedSecrets}) => <SecretSharingPad
					padId={padId}
					padLetter={letter}
					description={description}
					encryptedSecrets={encryptedSecrets}
				/>
			)
		}</div>
	</div>;
}


/**
 * Given a string with paragraphs separated by newlines, output each in a new
 * <p> tag.
 */
function stringToParagraphs(str) {
	return str.trim().split(/[\n]+/).map(line => <p>{line}</p>);
}


/**
 * A single secret sharing pad, ready for printing.
 *
 * Props:
 * * padId: The unique ID identifying the set of secret sharing pads.
 * * padLetter: The letter for this pad.
 * * description: Any introductory notes from the pad author to display.
 * * encryptedSecrets: An array of {name, description, encryptedSecret: [{letter,  code: [n,
 *   ...]}, ...]} objects.  For each secret to be displayed gives the name and
 *   description string and encrypted secrets. Each encrypted secret is given
 *   as an array of encoded values and their associated letters.
 */
function SecretSharingPad({
	padId,
	padLetter,
	description,
	encryptedSecrets,
}) {
	return (
		<div className="pad">
			<div className="header">
				<div>
					<h1>Secret Sharing Pad</h1>
					<p>{padId} {padLetter}</p>
				</div>
			</div>

			<div class="desc">{stringToParagraphs(description)}</div>
			{encryptedSecrets.map(
				({name, description, encryptedSecret}, i) => <div class="secret">
					<p class="name">Secret {i+1}: {name}</p>
					{stringToParagraphs(description)}
					<table>
						<thead>
							<tr>
								{encryptedSecret.map(({letter}) => <td>{letter}</td>)}
							</tr>
						</thead>
						<tbody>
							<tr>
								{encryptedSecret.map(({code}) => <td>{code.map(n => n.toString().padStart(3, '0')).join(" ")}</td>)}
							</tr>
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

function PrintHint() {
	return <div className="PrintHint">
		<button onClick={() => window.print()} title="Print all pads">
			<img src={printerIcon} alt="Print" />
		</button>
		<span>Warning: These pads will be shown only once.</span>
	</div>;
}
