// version.ts
import { execSync } from 'child_process';

const getGitCommitHash = () => {
    try {
        return execSync('git rev-parse HEAD').toString().trim();
    } catch (e) {
        console.error('Failed to get git commit hash', e);
        return 'unknown';
    }
};

const getGitBranch = () => {
    try {
        return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
    } catch (e) {
        console.error('Failed to get git branch', e);
        return 'unknown';
    }
};

const version = {
    commitHash: getGitCommitHash(),
    branch: getGitBranch(),
};

export default version;