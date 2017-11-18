#include <stdio.h>
#include <stdlib.h>
 /* 定义 */
const int OVERFLOW = -3;
const int ERROR = -2;
const int OK = -1;
const int FALSE = 0;
const int TRUE = 1;
const int LIST_SIZE = 5;
/* 别名定义  */
typedef int Status;
typedef int ElemType;
 
typedef struct {
    ElemType *elem;          //存储空间基址
    int length;              //当前长度
    int size;                //当前分配的储存容量
} SqList;

/* 初始化线性表L */
Status InitList(SqList *L);
/* 判断线性表L是否为空 */
int ListEmpty(SqList L);
// /* 求线性表长度 */
int ListLength(SqList L);
// /* 销毁线性表 */
Status DestroyList(SqList *L);
// /* 获取某个元素 */
Status GetElem(SqList L, int i, ElemType *e);
// /* 插入元素 */
Status ListInsert(SqList *L, int i, ElemType e);
// /* 删除元素 */
Status ListDelete(SqList *L, int i, ElemType *e);
// /* 遍历线性表 */
void LsitTraverse(SqList L, void (* fun)(ElemType, int));
// /* 获取位置 */
int LocateElem(SqList L, ElemType e);
// /* 获取前驱元素 */
Status PriorElem(SqList L, ElemType cur_e, ElemType *pre_e);
// /* 获取后继元素 */
Status NextElem(SqList L, ElemType cur_e, ElemType *next_e);


/* 初始化构造空表 */
Status InitList(SqList *L)
{
    L->elem = (ElemType *) malloc(LIST_SIZE * sizeof(ElemType));
    if (!L->elem) exit(OVERFLOW);
    L->length = 0;
    L->size = LIST_SIZE;
    return OK;
}

/* 自动扩容 */
void expand(SqList *L)
{
    /* 如果当前长度小于容量 退出*/
    if (L->length < L->size) return;
    /* 扩容最小值应该为默认容量 */
    int size = L->size < LIST_SIZE ? LIST_SIZE : L->size;
    /* 递增扩容 */
    // ElemType *newElem = (ElemType *) malloc((L.size + LIST_ADD) * sizeof(ElemType));
    /* 成倍扩容 */
    ElemType *newElem = (ElemType *) malloc(size * 2 * sizeof(ElemType));
    /* 复制元素 */
    for(int i = 0;i < L->length;i++) newElem[i] = L->elem[i];
    free(L->elem);
    L->elem = newElem;
    // L.size+=LIST_ADD;
    L->size = size * 2;
}
/* 自动缩容 */
void shrink(SqList *L)
{
    /* 当前长度小于默认容量 */
    if (L->length < LIST_SIZE) return;
    /* 如果使用容量大于一半 */
    if (L->length > L->size / 2) return;
    /* 缩容最小值 */
    int size = L->size / 2 > LIST_SIZE ? L->size / 2 : LIST_SIZE;
    ElemType *newElem = (ElemType *) malloc(size * sizeof(ElemType));
    for(int i = 0;i < L->length;i++) newElem[i] = L->elem[i];
    free(L->elem);
    L->elem = newElem;
    L->size = size;
}

Status ListEmpty(SqList L)
{
    return L.length == 0 ? TRUE : FALSE;
}

int ListLength(SqList L)
{
    return L.length;
}

Status DestroyList(SqList *L)
{
    free(L->elem);
    L->length = 0;
    L->size = 0;
    return OK;
}

Status GetElem(SqList L, int i, ElemType *e)
{
    if (i < 0 || i > L.length - 1) return ERROR;
    *e = L.elem[i];
    return OK;
}

Status ListInsert(SqList *L, int i, ElemType e)
{
    if (i < 0 || i > L->length) return ERROR;    //非法位置
    // if (L.length >= L.size) error('OVERFLOW');
    expand(L);
    /* 第i号元素开始后移一位 */
    for (int j = L->length - 1;j >= i;j--) L->elem[j + 1] = L->elem[j];
    L->elem[i] = e;
    L->length++;
    return OK;
}

Status ListDelete(SqList *L, int i, ElemType *e)
{
    if (i < 0 || i > L->length) return ERROR;    //非法位置
    *e = L->elem[i];
    for (++i;i < L->length;i++) L->elem[i - 1] = L->elem[i];   
    L->length--;
    shrink(L);
    return OK;
}

void LsitTraverse(SqList L, void (* fun)(ElemType, int))
{
    for(int i = 0;i < L.length;i++) fun(L.elem[i], i);
}

int LocateElem(SqList L, ElemType e)
{
    for(int i = 0;i < L.length;i++) if (L.elem[i] == e) return i;
    return -1;
}

Status PriorElem(SqList L, ElemType cur_e, ElemType *pre_e)
{
    int pos = LocateElem(L, cur_e);
    if (pos < 0) return ERROR;
    GetElem(L, --pos, pre_e);
    return OK;
}

Status NextElem(SqList L, ElemType cur_e, ElemType *next_e)
{
    int pos = LocateElem(L, cur_e);
    if (pos == -1 || pos > L.length - 2) return ERROR;
    GetElem(L, ++pos, next_e);
    return OK;
}









