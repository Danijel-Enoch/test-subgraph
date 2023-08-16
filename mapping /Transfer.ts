/* eslint-disable prefer-const */
import { BigInt } from "@graphprotocol/graph-ts";
import { Transfers } from "../generated/schema";
import { Transfer } from "../generated/Transfer/USDT";

const BI_ONE = BigInt.fromI32(1);
export function handleTransfer(event: Transfer): void {
	let transfer = Transfers.load(event.transaction.hash.toHex());
	if (transfer == null)
		transfer = new Transfers(event.transaction.hash.toHex());

	transfer.block = event.block.number;
	transfer.from = event.params.from.toHex();
	transfer.to = event.params.to.toHex();
	transfer.tokenId = event.params.value;

	transfer.save();
}
