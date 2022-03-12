<script>
	import Result from '../lib/Result.svelte';
	import { winner, prize, flagName, flagImage, userNFTs } from '../../../shared/store/store';
	import UserAssets from '../lib/UserAssets.svelte';
	import ARGENTINIAN_FLAG from '../../../shared/flags/270x180/arg.png';
	import BOLIVIAN_FLAG from '../../../shared/flags/270x180/bol.png';
	import BRAZIL_FLAG from '../../../shared/flags/270x180/bra.png';
	import GMB_FLAG from '../../../shared/flags/270x180/gmb.png';

	$userNFTs = [ARGENTINIAN_FLAG, BOLIVIAN_FLAG, BRAZIL_FLAG, GMB_FLAG];
	$winner = true;
	$prize = '100';
	$flagName = 'ARGENTINIAN FLAG NFT';
	$flagImage = ARGENTINIAN_FLAG;
</script>

<Result />
<UserAssets />
