import { hydratedData } from '../../../scripts/hydrate-outline-data';
import { json } from '@sveltejs/kit';

export async function GET() {
	return json(hydratedData);
}