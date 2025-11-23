import React, { useRef, useEffect, useState, useCallback } from "react";
import styles from "./index.module.less";
import TitleHeaderEnv from "@/containers/TitleHeaderEnv";
import {
  Input,
  Space,
  Table,
  Tag,
  Modal,
  Select,
  message,
  Popover,
  Popconfirm,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  getProjectCorpus,
  SearchMultilingual,
  getMultilingualCorpusList,
  deleteMultilingualItem,
  disableMultilingualItem,
  deleteLanguageByCorpusId,
} from "@/lib/languagePlatform";
import { envListObj } from "./config";
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import SyncModal from "./syncModal";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import {
  LanguageEnvType,
  corpusType,
  corpusDetailType,
  languagesDetailType,
  languagesType,
  PaginationType,
  corpusItemType,
  newCorpusItemType,
} from "@/types";
import { error, success } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import {
  setLanguageEnvCorpusId,
  setLanguageEnvList,
  setExportLanguageList,
} from "@/redux/reducers/importLanguage";
import ExportModal from "./exportModal";
import ImportModal from "./importModal";
import PublishModal from "./publishModal";
import PublishRecordModal from "./publishRecordModal";
import RightDrawer from "./RightDrawer";
import LanguageButton from "./LanguageButton";
import PermissionControl from "@/components/PermissionControl";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { getFromLanguages } from "@/lib/product";
import { postCorpusCompleteTranslation } from "@/lib/languagePlatform";
import TranslationFillModal from "./TranslationFillModal";
import cls from "classnames";
import SnapshotModal from "./SnapshotModal";
import { useTranslation } from "react-i18next";
import { themeConfig } from "@/constants/qiankun";

const getDisabledText = (disabled: boolean, t: (key: string) => string) => {
  return disabled
    ? t("languagesPlatform.disable")
    : t("languagesPlatform.enable");
};

export default function LanguagesPlatform() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const envCorpusId = useSelector(
    (state: RootState) => state.importLanguage.envCorpusId
  ); // 当前环境的语料库id
  const [searchParams] = useSearchParams();
  const { customizer } = useParams(); //项目名称
  const [confirmModal, contextHolder] = Modal.useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [searchContent, setSearchContent] = useState("");
  const [searchStatus, setSearchStatus] = useState("0,1,2,3"); //ai
  const [findEmptyStatus, setFindEmptyStatus] = useState(""); //ai
  const [data, setData] = useState<corpusItemType[]>();
  const [newWord, setNewWord] = useState<newCorpusItemType>({
    key: "",
    description: "",
  }); // 新增文案
  const [openDrawer, setOpenDrawer] = useState(false); // 右边抽屉
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [envCorpusData, setEnvCorpusData] = useState<corpusType>();
  const [columns, setColumns] = useState<ColumnsType<any>>([]); // 表格头部
  const tabPagination = useRef<PaginationType>({
    current: 1,
    pageSize: 50,
    total: 0,
  });
  const isEdit = useRef(false);
  const clientHeight = useRef(0);
  const newWords = useRef<newCorpusItemType>({ key: "", description: "" });
  const envList = useRef<LanguageEnvType[]>([]); // 当前项目的环境列表
  const isSearch = useRef(false); // 判断是否是搜索
  const prefsearchContent = useRef(""); // 记录上一次搜索的内容
  const prefsearchStatus = useRef(""); // 记录上一次搜索的状态
  const tableRef = useRef<any>();

  const [languages, setLanguages] = useState<languagesType[]>([]);
  const [selectLanguages, setSelectLanguages] = useState<string[]>([]);
  const formatLanguagesOpt =
    languages
      ?.filter((it) => it.customize === "default")
      .map((it) => ({
        label: it[themeConfig.langTextKey || "detail"],
        value: it.key,
      })) || [];
  const env = searchParams.get("env");

  const [completeLoading, setCompleteLoading] = useState(false);
  const [translateModal, setTranslateModal] = useState(false);
  const [snapshotModal, setSnapshotModal] = useState(false);

  const currentLanguages = envCorpusData?.languages || [];
  const disabledAutoComplete =
    completeLoading || currentLanguages?.length === 0;
  const initLanguages = async () => {
    if (!env) {
      message.warning(t("languagesPlatform.selectEnv"));
      return;
    }
    if (!customizer) {
      message.warning(t("languagesPlatform.selectProject"));
      return;
    }
    // 获取源语言
    getFromLanguages({
      projectId: searchParams.get("projectId")!,
      env,
    })
      .then((res) => {
        setLanguages(res);
      })
      .catch((e) => {
        message.error((e as unknown as { message: string }).message);
      });
  };

  const initData = () => {
    getEnvCorpus();
    clientHeight.current = tableRef.current.clientHeight - 64 - 55; // 64是分页器的高度，55是表格头部的高度
    initLanguages();
  };

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    // 清空编辑的值
    newWords.current = { key: "", description: "" };
    // 表格头部
    const column: any = [
      {
        title: "Multilingual Key",
        dataIndex: "key",
        key: "key",
        fixed: "left",
        width: 200,
        render: (text: string, record: any) => (
          <>
            <span>{text}</span>
            {record.disabled && (
              <Tag color="error" style={{ marginLeft: "10px" }}>
                {t("languagesPlatform.disabled")}
              </Tag>
            )}
          </>
        ),
      },
      {
        title: t("languagesPlatform.keyDescription"),
        dataIndex: "key",
        key: "key",
        fixed: "left",
        width: 100,
        render: (text: string, record: any) => record.description || "",
      },
    ];
    // 添加或编辑的文案
    if (!envCorpusData) return;
    envCorpusData.languages.forEach((element: languagesDetailType) => {
      const prefixTitle = `${element[themeConfig.langTextKey || "detail"]}_${
        element.mark
      }`;
      const title =
        element.customize !== "default"
          ? `${prefixTitle}：${element.customize}`
          : prefixTitle;
      column.push({
        title: (
          <>
            {title}
            <PermissionControl
              permission={[
                `${searchParams.get("env")}/index/languages/deleteLanguages`,
              ]}
            >
              <Popconfirm
                title="删除语言"
                description="确定要删除语言么？"
                onConfirm={async () => {
                  const [err, data] = await deleteLanguageByCorpusId({
                    corpusId: envCorpusId,
                    languages: [
                      {
                        ...element,
                      },
                    ],
                  });

                  if (err) {
                    message.error(
                      (err as unknown as { message: string }).message ||
                        "删除语言失败"
                    );
                    return;
                  }
                  message.success("删除语言成功");
                  // 重新获取环境语料
                  initData();
                }}
                okText="确定"
                cancelText="取消"
              >
                <DeleteOutlined className="ml-[4px] hover:text-red-500! cursor-pointer" />
              </Popconfirm>
            </PermissionControl>
          </>
        ),
        dataIndex: element.key,
        key: element.key,
        width: 320,
        render: (record: corpusDetailType) => {
          if (!record) return null;
          const copyValue = record.value && (
            <CopyToClipboard
              text={record.value}
              onCopy={() => {
                message.success(t("languagesPlatform.copySuccess"));
              }}
            >
              <span style={{ cursor: "pointer" }}>{record.value}</span>
            </CopyToClipboard>
          );
          const isPending = record.status === 0 || record.status === 1;
          const hasMerged = record.status === 3;
          return (
            <div>
              {copyValue}
              {isPending && (
                <Tag color="volcano" style={{ marginLeft: "10px" }}>
                  {t("languagesPlatform.status.pending")}
                </Tag>
              )}
              {hasMerged && (
                <Tag color="success" style={{ marginLeft: "10px" }}>
                  {t("languagesPlatform.status.merged")}
                </Tag>
              )}
            </div>
          );
        },
      });
      newWords.current[element.key] = {
        name:
          element.customize !== "default"
            ? element?.[themeConfig.langTextKey || "detail"] +
              "：" +
              element.customize
            : element?.[themeConfig.langTextKey || "detail"],
        value: "",
      };
    });
    setNewWord({ ...newWords.current });
    column.push({
      title: t("common.operation"),
      key: "action",
      fixed: "right",
      width: 168,
      render: (_: any, record: corpusItemType) => (
        <Space size="middle">
          <PermissionControl
            permission={[`${searchParams.get("env")}/index/languages/update`]}
          >
            <a onClick={() => editLanguage(record)}>{t("common.edit")}</a>
          </PermissionControl>
          <PermissionControl
            permission={[`${searchParams.get("env")}/index/languages/delete`]}
          >
            <a onClick={() => deleteLanguage(record.key)}>
              {t("languagesPlatform.delete")}
            </a>
          </PermissionControl>
          <a onClick={() => disableModal([record.key], !record.disabled)}>
            {getDisabledText(!record.disabled, t)}
          </a>
        </Space>
      ),
    });
    setColumns(column);
    setData(envCorpusData.corpus);
    setSelectedRowKeys([]);
  }, [envCorpusData, t]);

  // 删除语料
  const deleteLanguage = (value: string) => {
    deleteModal([value]);
  };

  // 批量删除
  const deleteAll = () => {
    selectedRowKeys.length !== 0 && deleteModal(selectedRowKeys);
  };

  const deleteModal = (keys: React.Key[]) => {
    confirmModal.confirm({
      title: t("languagesPlatform.delete"),
      icon: <ExclamationCircleOutlined />,
      content: t("languagesPlatform.deleteConfirm"),
      okText: t("common.confirm"),
      cancelText: t("common.cancel"),
      zIndex: 1000,
      onOk: async () => {
        try {
          await deleteMultilingualItem({ corpusId: envCorpusId, keys });
          success(t("languagesPlatform.deleteSuccess"));
          setSelectedRowKeys([]);
          getContent(true);
        } catch (e) {
          error((e as unknown as { message: string }).message);
        }
      },
    });
  };

  const disableModal = (keys: React.Key[], disabled = true) => {
    const text = getDisabledText(disabled, t);
    confirmModal.confirm({
      title: text,
      icon: <ExclamationCircleOutlined />,
      content: disabled
        ? t("languagesPlatform.disableConfirm")
        : t("languagesPlatform.enableConfirm"),
      okText: t("common.confirm"),
      cancelText: t("common.cancel"),
      zIndex: 1000,
      onOk: async () => {
        try {
          await disableMultilingualItem({
            corpusId: envCorpusId,
            keys,
            disabled,
          });
          success(
            disabled
              ? t("languagesPlatform.disableSuccess")
              : t("languagesPlatform.enableSuccess")
          );
          getContent(true);
        } catch (e) {
          error((e as unknown as { message: string }).message);
        }
      },
    });
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    fixed: true,
    onChange: onSelectChange,
  };

  // 关闭右边抽屉
  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };

  // 获取环境列表
  const getEnvCorpus = async () => {
    if (!searchParams.get("projectId") && !searchParams.get("env")) {
      return navigate("/index/languages");
    }
    setIsLoading(true);
    try {
      const projectCorpus = await getProjectCorpus({
        projectId: searchParams.get("projectId"),
      });
      envList.current = projectCorpus;
      envList.current.forEach((item: LanguageEnvType, index: number) => {
        const mark: string = item.envMark;
        const envListObject = envListObj(t);
        envList.current[index].lable =
          envListObject[mark as keyof typeof envListObject];
        envList.current[index].value = item.corpusId;
      });
      dispatch(setLanguageEnvList(envList.current));
      await getEnvCorpusList();
      setSearchContent("");
    } catch (e) {
      error((e as unknown as { message: string }).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteTranslation = async (
    vendor: string,
    langList: corpusType["languages"],
    sourceInfo: languagesDetailType
  ) => {
    if (completeLoading) return;
    setCompleteLoading(true);
    const [err] = await postCorpusCompleteTranslation({
      corpusId: envCorpusId,
      vendor,
      sourceLanguage: sourceInfo.key,
      sourceCustomize: sourceInfo.customize,
      languageVos: langList,
    });
    setCompleteLoading(false);

    if (err) {
      message.error(
        (err as unknown as { message: string })?.message || "补全翻译失败"
      );
      return;
    }
    message.success("补全翻译成功");
    setTranslateModal(false);
    search();
  };

  // 获取环境的语料
  const getEnvCorpusList = async () => {
    setIsLoading(true);
    isSearch.current = false;
    try {
      const corpusId = envList.current.filter(
        (item: LanguageEnvType) => item.envMark === searchParams.get("env")
      )[0].corpusId;
      dispatch(setLanguageEnvCorpusId(corpusId));
      const multilingualCorpus = await getMultilingualCorpusList({
        corpusId,
        page: tabPagination.current.current,
        limit: tabPagination.current.pageSize,
        env: searchParams.get("env") || "",
      });
      multilingualCorpus.languages.forEach(
        (item: languagesType, index: number) => {
          multilingualCorpus.languages[index].value = item.key;
          multilingualCorpus.languages[index].lable =
            item.customize !== "default"
              ? item[themeConfig.langTextKey || "detail"] +
                "：" +
                item.customize
              : item[themeConfig.langTextKey || "detail"];
        }
      );
      tabPagination.current.total = multilingualCorpus.pageInfo.totalCount;
      setEnvCorpusData(multilingualCorpus);
      dispatch(setExportLanguageList(multilingualCorpus.languages));
    } catch (e) {
      error((e as unknown as { message: string }).message);
    } finally {
      setIsLoading(false);
    }
  };

  // 缓存获取环境的语料
  const getEnvCorpusListCache = useCallback(() => {
    tabPagination.current.current = 1;
    tabPagination.current.pageSize = 50;
    setSearchContent("");
    setSearchStatus("0,1,2,3");
    getEnvCorpusList();
  }, [envCorpusId]);

  // 根据条件看是否获取搜索语料
  const getSearchCorpus = () => {
    getContent();
  };

  // 修改搜索内容
  const changeSearchContent = (value: string) => {
    setSearchContent(value);
  };

  // 修改多语言文本内容
  const editLanguage = async (value: corpusItemType) => {
    isEdit.current = true;
    Object.keys(value).forEach((key) => {
      if (key === "key" || key === "description") {
        newWords.current[key] = value[key];
      } else {
        newWords.current[key] = {
          ...newWords.current[key],
          ...value[key],
        };
      }
    });
    setNewWord({ ...newWords.current });
    setOpenDrawer(true);
  };

  const submitEnv = () => {
    if (envList.current.length === 0) return;
    getEnvCorpusList();
  };

  const resetSearch = () => {
    setSearchContent("");
    setSearchStatus("0,1,2,3");
    setSelectLanguages([]);
    setFindEmptyStatus("");
  };

  const getSearchData = async () => {
    setIsLoading(true);
    const statusArray = prefsearchStatus.current.split(",");
    const filteredLanguages = languages.filter((language) =>
      selectLanguages.includes(language.key)
    );
    try {
      await SearchMultilingual({
        corpusId: envCorpusId,
        key: prefsearchContent.current,
        status: statusArray,
        pageInfo: {
          limit: tabPagination.current.pageSize,
          page: tabPagination.current.current,
        },
        languages: filteredLanguages,
        findEmpty: !!findEmptyStatus,
      }).then((res: corpusType) => {
        setEnvCorpusData(res);
        setData(res.corpus);
        tabPagination.current.total = res.pageInfo.totalCount;
      });
    } catch (e) {
      error((e as unknown as { message: string }).message);
    } finally {
      setIsLoading(false);
    }
  };

  const search = () => {
    tabPagination.current.current = 1;
    tabPagination.current.pageSize = 50;
    if (
      searchContent === "" &&
      searchStatus === "0,1,2,3" &&
      findEmptyStatus === "" &&
      selectLanguages.length === 0
    ) {
      return getEnvCorpusList();
    }
    !isSearch.current && (isSearch.current = true);
    prefsearchContent.current = searchContent;
    prefsearchStatus.current = searchStatus;
    getSearchData();
  };

  //添加多语言文案
  const addLanguageKey = () => {
    isEdit.current = false; //ai
    Object.keys(newWords.current).forEach((key) => {
      key === "key" || key === "description"
        ? (newWords.current[key] = "")
        : (newWords.current[key].value = ""); //ai
    });
    setNewWord({ ...newWords.current });
    setOpenDrawer(true);
  };

  // 表格中页码发生改变时
  const handleTableChange = (pagination: {
    current?: number;
    pageSize?: number;
    total?: number;
  }) => {
    tabPagination.current.current = pagination.current || 1;
    tabPagination.current.pageSize = pagination.pageSize || 50;
    getContent();
  };

  // 获取内容，是否是删除后搜索
  const getContent = (isDelete = false) => {
    if (isDelete) {
      tabPagination.current.current = 1;
      tabPagination.current.pageSize = 50;
    }
    isSearch.current ? getSearchData() : getEnvCorpusList();
  };

  return (
    <div className={styles.clientMember}>
      {TitleHeaderEnv(
        t("languagesPlatform.title"),
        customizer ? customizer : t("languagesPlatform.subTitle"),
        submitEnv
      )}
      <div className={styles["top"]}>
        <div className={styles["top-left"]}>
          <div className={styles["top-left-title"]}>
            {t("languagesPlatform.corpusList")}
          </div>
          <PermissionControl
            permission={[`${searchParams.get("env")}/index/languages/query`]}
          >
            <div className={styles["top-left-search"]}>
              <div className={styles["top-input"]}>
                <div className={styles["top-left-search-text"]}>
                  {t("languagesPlatform.key")}:{" "}
                </div>
                <Input
                  placeholder={t("languagesPlatform.keyPlaceholder")}
                  value={searchContent}
                  onChange={(e) => changeSearchContent(e.target.value)}
                  onPressEnter={() => search()}
                  className={styles["top-left-search-input"]}
                />
              </div>
              <div className={styles["top-input"]}>
                <div className={styles["top-left-search-text"]}>
                  {t("languagesPlatform.status")}:{" "}
                </div>
                <Select
                  defaultValue={"0,1,2,3"}
                  style={{ width: 100 }}
                  options={[
                    {
                      value: "0,1,2,3",
                      label: t("languagesPlatform.status.all"),
                    },
                    {
                      value: "0,1",
                      label: t("languagesPlatform.status.pending"),
                    },
                    {
                      value: "2",
                      label: t("languagesPlatform.status.published"),
                    },
                    { value: "3", label: t("languagesPlatform.status.merged") },
                  ]}
                  value={searchStatus}
                  onChange={(value) => setSearchStatus(value)}
                />
              </div>
              <div className={styles["top-input"]}>
                <div className={styles["top-left-search-text"]}>
                  {t("languagesPlatform.languageScope")}:{" "}
                </div>
                <Select
                  style={{ width: 120 }}
                  showSearch
                  placeholder={t("languagesPlatform.status.all")}
                  allowClear
                  options={languages.map((item) => ({
                    label: item.detail,
                    value: item.key,
                  }))}
                  mode="multiple"
                  tagRender={(info) => {
                    const onPreventMouseDown = (
                      event: React.MouseEvent<HTMLSpanElement>
                    ) => {
                      event.preventDefault();
                      event.stopPropagation();
                    };
                    return (
                      <Tag
                        onMouseDown={onPreventMouseDown}
                        style={{ marginRight: 3 }}
                        closable={info?.closable}
                        onClose={info?.onClose}
                      >
                        {info?.label}
                      </Tag>
                    );
                  }}
                  filterOption={(input, option) => {
                    if (option?.label) {
                      return option.label
                        .toLowerCase()
                        .includes(input.toLowerCase());
                    }
                    return false;
                  }}
                  value={selectLanguages}
                  onChange={(values) => {
                    setSelectLanguages(values);
                  }}
                  maxTagTextLength={6}
                  maxTagCount={1}
                />
              </div>
              <div className={styles["top-input"]}>
                <div className={styles["top-left-search-text"]}>
                  {t("languagesPlatform.empty")}:{" "}
                </div>
                <Select
                  defaultValue={""}
                  style={{ width: 60 }}
                  options={[
                    { value: "", label: t("languagesPlatform.empty.no") },
                    { value: "1", label: t("languagesPlatform.empty.yes") },
                  ]}
                  value={findEmptyStatus}
                  onChange={(value) => setFindEmptyStatus(value)}
                />
              </div>
            </div>
          </PermissionControl>
        </div>
        <div className={styles["top-right"]}>
          <div className={styles["top-icon"]} onClick={() => resetSearch()}>
            {i18n.t("languagesPlatform.reset")}
          </div>
          <PermissionControl
            permission={[`${searchParams.get("env")}/index/languages/query`]}
          >
            <div className={styles["top-icon"]} onClick={() => search()}>
              {t("languagesPlatform.search")}
            </div>
          </PermissionControl>
        </div>
      </div>
      {translateModal && (
        <TranslationFillModal
          confirmLoading={completeLoading}
          langs={currentLanguages}
          visible={translateModal}
          onClose={() => {
            setTranslateModal(false);
          }}
          onConfirm={(vendor, langList, sourceLang) => {
            handleCompleteTranslation(vendor, langList, sourceLang);
          }}
        />
      )}
      <SnapshotModal
        corpusId={envCorpusId}
        customizer={customizer || ""}
        env={searchParams.get("env") || ""}
        open={snapshotModal}
        onClose={() => {
          setSnapshotModal(false);
        }}
        onCancel={() => {
          setSnapshotModal(false);
        }}
      />
      <div className={styles["body"]}>
        <div className={styles["body-top-btn"]}>
          <div className={styles["body-top-left-btn"]}>
            {formatLanguagesOpt.length && (
              <PermissionControl
                permission={[
                  `${searchParams.get("env")}/index/languages/addLanguage`,
                ]}
              >
                <LanguageButton
                  corpusId={envCorpusId}
                  project={customizer as string}
                  onSuccess={getEnvCorpus}
                  fromLangOptList={formatLanguagesOpt}
                />
              </PermissionControl>
            )}
            <PermissionControl
              permission={[
                `${searchParams.get(
                  "env"
                )}/index/languages/translateToMultiLanguage`,
              ]}
            >
              <div
                className={styles["body-btn"]}
                onClick={() => addLanguageKey()}
              >
                {t("languagesPlatform.addCorpus")}
              </div>
            </PermissionControl>
            <PermissionControl
              permission={[`${searchParams.get("env")}/index/languages/import`]}
            >
              <ImportModal
                callback={getEnvCorpusListCache}
                className={styles["body-btn"]}
              />
            </PermissionControl>
            <PermissionControl
              permission={[`${searchParams.get("env")}/index/languages/export`]}
            >
              <ExportModal className={styles["body-btn"]} />
            </PermissionControl>
            {/* <PermissionControl
              permission={[`${searchParams.get('env')}/index/languages/downloadTemplate`]}
            >
              <div className={styles['body-btn']} onClick={() => downTamplate()}>
                {t('languagesPlatform.downloadTemplate')}
              </div>
            </PermissionControl> */}
            <PermissionControl
              permission={[
                `${searchParams.get("env")}/index/languages/delete/much`,
              ]}
            >
              <div
                className={`${styles["body-btn"]} ${
                  selectedRowKeys.length === 0 && styles["btn-deactive"]
                }`}
                onClick={() => deleteAll()}
              >
                {i18n.t("languagesPlatform.batchDelete")}
              </div>
            </PermissionControl>
            <PermissionControl
              permission={[
                `${searchParams.get("env")}/index/languages/publishRecord`,
              ]}
            >
              <PublishRecordModal
                className={styles["body-btn"]}
                callback={getEnvCorpusListCache}
              />
            </PermissionControl>
            <CopyToClipboard
              text={`${import.meta.env.VITE_API_BASE_URL}/client/${
                customizer || "项目名称"
              }/${
                searchParams.get("env")?.toLowerCase() || "环境"
              }/en-US/default`}
              onCopy={() => {
                message.success(t("languagesPlatform.copySuccess"));
              }}
            >
              <div className={styles["body-btn"]}>
                {t("languagesPlatform.copyApi")}
              </div>
            </CopyToClipboard>
            <PermissionControl
              permission={[
                `${searchParams.get(
                  "env"
                )}/index/languages/corpus/completeTranslation`,
              ]}
            >
              <div
                className={cls(styles["body-btn"], {
                  [styles["btn-deactive"]]: disabledAutoComplete,
                })}
                onClick={() => {
                  if (disabledAutoComplete) return;
                  setTranslateModal(true);
                }}
              >
                {t("languagesPlatform.completeTranslation")}
              </div>
            </PermissionControl>
            <PermissionControl
              permission={[
                `${searchParams.get("env")}/index/languages/corpus/snapshot`,
              ]}
            >
              <div
                className={cls(styles["body-btn"])}
                onClick={() => {
                  setSnapshotModal(true);
                }}
              >
                查看快照
              </div>
            </PermissionControl>
          </div>
          <div className={styles["body-top-right-btn"]}>
            <PermissionControl
              permission={[`${searchParams.get("env")}/index/languages/sync`]}
            >
              <SyncModal className={styles["body-btn"]} />
            </PermissionControl>
            <PermissionControl
              permission={[
                `${searchParams.get("env")}/index/languages/publish`,
              ]}
            >
              <PublishModal
                getTableData={getEnvCorpusListCache}
                className={styles["body-btn"]}
              />
            </PermissionControl>
          </div>
        </div>
        <Table
          rowSelection={rowSelection}
          className={styles["body-table"]}
          loading={isLoading}
          pagination={{
            ...tabPagination.current,
            showTotal: (total) =>
              i18n.t("languagesPlatform.totalData", { total }),
          }}
          rowKey={"key"}
          columns={columns}
          dataSource={data}
          bordered
          onChange={handleTableChange}
          scroll={{ y: clientHeight.current, x: 1200 }}
          ref={tableRef}
        />
      </div>
      <RightDrawer
        newWords={newWord}
        isEdit={isEdit.current}
        open={openDrawer}
        onCloseDrawer={onCloseDrawer}
        getEnvCorpusListCallback={getEnvCorpusListCache}
        getContentCallback={getSearchCorpus}
      />
      {contextHolder}
    </div>
  );
}
