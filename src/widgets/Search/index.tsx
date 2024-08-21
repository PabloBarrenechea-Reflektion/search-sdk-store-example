import React from "react";
import type {
  SearchResultsInitialState,
  SearchResultsStoreState,
} from "@sitecore-search/react";
import {
  WidgetDataType,
  useSearchResults,
  widget,
} from "@sitecore-search/react";

import Filter from "@/components/Filter";
import ProductItemCard from "@/components/ProductCard";
import QueryResultsSummary from "@/components/QueryResultsSummary";
import ResultsPerPage from "@/components/ResultsPerPage";
import SearchFacetsProduct from "@/components/SearchFacets";
import SearchPagination from "@/components/SearchPagination";
import SortOrder from "@/components/SortOrder";
import Spinner from "@/components/Spinner";
import { ProductModel } from "@types.ts";

type SearchResultsProps = {
  defaultSortType?: SearchResultsStoreState["sortType"];
  defaultPage?: SearchResultsStoreState["page"];
  defaultItemsPerPage?: SearchResultsStoreState["itemsPerPage"];
  defaultKeyphrase?: SearchResultsStoreState["keyphrase"];
};
type InitialState = SearchResultsInitialState<
  "itemsPerPage" | "keyphrase" | "page" | "sortType"
>;

export const WIDGETTEMPLATEComponent = ({
  defaultSortType = "title_ascending",
  defaultPage = 1,
  defaultKeyphrase = "",
  defaultItemsPerPage = 24,
}: SearchResultsProps) => {
  const {
    widgetRef,
    actions: { onItemClick },
    state: { sortType, page, itemsPerPage },
    queryResult: {
      isLoading,
      isFetching,
      data: {
        total_item: totalItems = 0,
        sort: { choices: sortChoices = [] } = {},
        facet: facets = [],
        content: products = [],
      } = {},
    },
  } = useSearchResults<ProductModel, InitialState>({
    config: {
      facets: {
        price: {
          type: "range",
        },
      },
    },
    state: {
      sortType: defaultSortType,
      page: defaultPage,
      itemsPerPage: defaultItemsPerPage,
      keyphrase: defaultKeyphrase,
    },
  });
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-white dark:bg-gray-600 opacity-50">
        <Spinner loading />
      </div>
    );
  }
  return (
    <div ref={widgetRef}>
      <div className="flex relative max-w-full px-4 text-black text-opacity-75 dark:text-white">
        {isFetching && (
          <div className="w-full h-full fixed top-0 left-0 bottom-0 right-0 z-30 bg-white dark:bg-gray-600 opacity-50">
            <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col justify-center items-center z-40">
              <Spinner loading />
            </div>
          </div>
        )}
        {totalItems > 0 && (
          <>
            <section className="flex flex-col flex-none relative mt-4 mr-8 w-[20%]">
              <Filter />

              <SearchFacetsProduct facets={facets} />
            </section>
            <section className="flex flex-col flex-[4_1_0%]">
              {/* Sort Select */}
              <section className="flex justify-between text-xs mb-2">
                {totalItems > 0 && (
                  <QueryResultsSummary
                    currentPage={page}
                    itemsPerPage={itemsPerPage}
                    totalItems={totalItems}
                    totalItemsReturned={products.length}
                  />
                )}
                <SortOrder options={sortChoices} selected={sortType} />
              </section>

              {/* Results */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 md:gap-x-5 xl:gap-x-6 gap-y-3 xl:gap-y-4">
                {products.map((product, index) => (
                  <ProductItemCard
                    className="w-full"
                    product={product}
                    index={index}
                    onItemClick={onItemClick}
                  />
                ))}
              </div>
              <div className="flex flex-col md:flex-row md:justify-between text-xs my-4">
                <ResultsPerPage defaultItemsPerPage={defaultItemsPerPage} />
                <SearchPagination currentPage={page} totalPages={totalPages} />
              </div>
            </section>
          </>
        )}
        {totalItems <= 0 && !isFetching && (
          <div className="w-full flex justify-center">
            <h3>0 Results</h3>
          </div>
        )}
      </div>
    </div>
  );
};

const WIDGETTEMPLATEWidget = widget(
  WIDGETTEMPLATEComponent,
  WidgetDataType.SEARCH_RESULTS,
  "product",
);
export default WIDGETTEMPLATEWidget;
