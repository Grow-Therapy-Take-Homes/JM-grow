import { useEffect } from "react";

import { ArticleListItem } from "../../components/article-list-item";
import { DateObject, getDate } from "../../utils/date-utils";
import { Error } from "../../components/error";
import { List } from "../../components/list";
import { Loading } from "../../components/loading";
import { PageHeader } from "../../components/page-header";
import { Pagination } from "../../components/pagination";
import { SearchBar } from "../../components/search-bar";
import { useApi } from "../../hooks/use-api";
import { useLocalStorage } from "../../hooks/use-local-storage";
import { usePagination } from "../../hooks/use-pagination";

import styles from "./articles-page.module.css";

export interface Article {
  rank: number | string;
  article: string;
  views: number;
  pinned?: boolean;
}

export const ArticlesPage = () => {
  // previous day
  const startDate = Date.now() - 24 * 60 * 60 * 1000;
  const [pinned, setPinned] = useLocalStorage<Article[]>("pinned", []);
  const { data, loading, error, getArticles, patchData } = useApi<Article[]>();
  const { activeData, currentPage, pageCount, setPage } =
    usePagination<Article>({
      data: data,
      itemsPerPage: 10,
    });

  useEffect(() => {
    const { year, month, day } = getDate(startDate);
    getArticles(`${year}/${month}/${day}`, 100, transformData);
  }, []);

  const search = ({ year, month, day }: DateObject, amount: number) => {
    getArticles(`${year}/${month}/${day}`, amount, transformData);
    setPage(0);
  };

  const handlePinClick = (article: Article) => {
    let updatedData;
    const isPinned = pinned.find((pinnedArticle: Article) => {
      return pinnedArticle.article === article.article;
    });

    if (isPinned) {
      updatedData = pinned.filter(
        (pinnedArticle: Article) => pinnedArticle !== isPinned
      );
      setPinned(updatedData);
    } else {
      updatedData = [...pinned, { ...article, ["pinned"]: true, ["rank"]: "" }];
      setPinned(updatedData);
    }

    if (data) patchData(transformData(data, updatedData));
  };

  // a mock to update the data with the pinned articles, also to mimic either optimistic update or a re-fetch
  const transformData = (arr: Article[], pinnedData = pinned): Article[] => {
    if (!arr || !Array.isArray(arr)) return [];
    return arr.map((article: Article) => {
      const isPinned = pinnedData.find((pinnedArticle: Article) => {
        return pinnedArticle.article === article.article;
      });

      if (isPinned) {
        article.pinned = true;
      } else {
        article.pinned = false;
      }

      return article;
    });
  };

  return (
    <div className={styles.ArticlesPage}>
      <PageHeader title={"Top Wikipedia Articles"} />
      <SearchBar handleSearch={search} startDate={startDate} />
      <div className={styles.ArticlesPagePinned}>
        <List
          items={pinned}
          emptyMessage="No pinned articles to display"
          enableAnimations={true}
          renderView={(item: Article) => (
            <ArticleListItem article={item} handlePinClick={handlePinClick} />
          )}
        />
      </div>
      <div className={styles.ArticlesList}>
        {error ? <Error message={error} /> : null}
        {loading ? (
          <div className={styles.ArticlesPageLoading}>
            <Loading />
          </div>
        ) : null}
        <List
          items={activeData}
          emptyMessage="No articles found"
          renderView={(item: Article) => (
            <ArticleListItem article={item} handlePinClick={handlePinClick} />
          )}
        />
      </div>
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        setPage={setPage}
      />
    </div>
  );
};
