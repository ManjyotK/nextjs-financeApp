import { getCategories } from "../lib/data";
import CategoryTable from "../ui/categoryTable";

export default async function Page(){
    const categories = await getCategories();
    return (
        <div>
            <h1>Manage</h1>
            
            <CategoryTable categories={categories} />
            {/* <CategoryTable/> */}
        </div>
    );
}
