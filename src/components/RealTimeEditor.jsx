import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

const RealTimeEditor = ({ name, control, label, defaultValue = '' }) => {
    return (
        <div className="w-full">
            {label && <label className="inline-block mb-1 pl-1">{label}</label>}
            <Controller
    name={name || 'description'}
    control={control}
    rules={{ required: 'Content is required' }}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
            <Editor
                apiKey='q0mydiydd1vcquyqnlxda2fun0l43m9rst1muln46ona7vs0'
                value={value || defaultValue}
                init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                        'image',
                        'advlist',
                        'autolink',
                        'lists',
                        'link',
                        'charmap',
                        'preview',
                        'anchor',
                        'searchreplace',
                        'visualblocks',
                        'code',
                        'fullscreen',
                        'insertdatetime',
                        'media',
                        'table',
                        'help',
                        'wordcount',
                    ],
                    toolbar:
                        'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
                onEditorChange={onChange}
            />
            {error && <p className="text-red-500">{error.message}</p>}
        </>
    )}
/>

        </div>
    );
};

export default RealTimeEditor;
