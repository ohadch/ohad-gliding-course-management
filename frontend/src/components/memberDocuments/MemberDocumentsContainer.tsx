import {IMemberDocument, IMemberDocumentCreate} from "../../@types/models/MemberDocument";
import {Grid} from "@mui/material";
import CreateMemberDocumentDialog from "./CreateMemberDocumentDialog.tsx";
import {useEffect, useState} from "react";
import {IMember} from "../../@types";
import {MemberDocumentsApiService} from "../../services/api/memberDocumentsApi.service.ts";
import {getDisplayNameByMemberDocumentType} from "../../utils/memberDocuments.ts";
import MemberDocumentsTable from "./MemberDocumentsTable.tsx";
import EditMemberDocumentDialog from "./EditMemberDocumentDialog.tsx";

export interface MemberDocumentsProps {
    member: IMember;
}

export default function MemberDocumentsContainer({member}: MemberDocumentsProps) {
    const [documents, setDocuments] = useState<IMemberDocument[] | null>(null);
    const [createMemberDocumentDialogOpen, setCreateMemberDocumentDialogOpen] = useState<boolean>(false);
    const [currentlyEditedMemberDocument, setCurrentlyEditedMemberDocument] = useState<IMemberDocument | null>(null);
    const memberDocumentsApiService = new MemberDocumentsApiService(member.id);

    useEffect(() => {
        if (!documents) {
            memberDocumentsApiService.get().then((documents) => {
                setDocuments(documents);
            });
        }
    })

    const createMemberDocument = (data: IMemberDocumentCreate) => {
        memberDocumentsApiService
            .create(data)
            .then((document) => {
                setDocuments([...(documents || []), document]);
            })
            .catch((err) => {
                alert(err);
            })
    }

    const updateMemberDocument = (data: IMemberDocument) => {
        memberDocumentsApiService
            .update(data.id, {
                type: data.type,
                status: data.status,
                expiration_at: data.expiration_at,
            })
            .then((document) => {
                setDocuments((documents || []).map((d) => {
                    if (d.id === document.id) {
                        return document;
                    }

                    return d;
                }));
            })
            .catch((err) => {
                alert(err);
            })
    }

    const deleteMemberDocument = (document: IMemberDocument) => {
        const documentDisplayName = getDisplayNameByMemberDocumentType(document.type);

        if (!window.confirm(`Are you sure you want to delete ${member.name}'s ${documentDisplayName} document?`)) {
            return;
        }

        memberDocumentsApiService
            .delete(document.id)
            .then(() => {
                setDocuments((documents || []).filter((d) => d.id !== document.id));
            })
            .catch((err) => {
                alert(err);
            })
    }

    return (
        <>
            <CreateMemberDocumentDialog
                open={createMemberDocumentDialogOpen}
                onClose={() => setCreateMemberDocumentDialogOpen(false)}
                onMemberDocumentCreate={createMemberDocument}
            />
            {currentlyEditedMemberDocument && (
                <EditMemberDocumentDialog
                    open={!!currentlyEditedMemberDocument}
                    onClose={() => setCurrentlyEditedMemberDocument(null)}
                    memberDocument={currentlyEditedMemberDocument}
                    onMemberDocumentUpdate={updateMemberDocument}
                />
            )}
            <Grid container spacing={2}>
                <MemberDocumentsTable
                    documents={documents || []}
                    onMemberDocumentCreate={() => setCreateMemberDocumentDialogOpen(true)}
                    onMemberDocumentEdit={(document) => setCurrentlyEditedMemberDocument(document)}
                    onMemberDocumentDelete={deleteMemberDocument}
                />
            </Grid>
        </>
    )
}