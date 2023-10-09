import { faThumbTack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Article } from "../../pages/articles-page";
import { replaceUnderscores } from "../../utils/string-utils";

import styles from "./article-list-item.module.css";

interface ArticleListItemProps {
  article: Article;
  handlePinClick: (article: Article) => void;
}

export const ArticleListItem = ({
  article,
  handlePinClick,
}: ArticleListItemProps) => {
  const pinnedColor = article.pinned
    ? "var(--site-dark-orange)"
    : "var(--site-light-orange)";

  return (
    <div className={styles.ArticleListItem}>
      <div className={styles.ArticleRank}>{article.rank}</div>
      <div className={styles.ArticleTitle}>
        {replaceUnderscores(article.article)}
      </div>
      <div className={styles.ArticleViews}>
        {article.views.toLocaleString()} views
      </div>
      <div className={styles.ArticlePin}>
        <button
          className={styles.ArticlePinButton}
          onClick={() => handlePinClick(article)}
        >
          <FontAwesomeIcon icon={faThumbTack} style={{ color: pinnedColor }} />
        </button>
      </div>
    </div>
  );
};
